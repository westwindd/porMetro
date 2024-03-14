import supertest from 'supertest';
import app from './server.js';
import mongoose from 'mongoose';
import TextureItem from './src/models/textureItemModel.js';
import User from './src/models/userModel.js'; // Import User model
import Cost from './src/models/costModel.js';

 
const request = supertest(app);
var createdItemId;

describe('Texture Items API', () => {
  

  afterAll(async () => {
    if (createdItemId) {
        await TextureItem.findByIdAndDelete(createdItemId);
    }
  });

  it('should POST a new texture item', async () => {
    const newItem = {
      name: 'Test Texture',
      description: 'A test texture item',
      price: 10.99,
      inStock: true,
      quantity:1
    };

    const response = await request.post('/api/items').send(newItem);
    createdItemId = response.body._id;

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newItem.name);
  });

  it('should GET all the texture items', async () => {
    const response = await request.get('/api/items');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should GET a texture item by ID', async () => {
    const response = await request.get(`/api/items/${createdItemId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(createdItemId);
  });

  it('should UPDATE a texture item', async () => {
    const updatedItem = {
      name: 'Updated Test Texture'
    };

    const response = await request.put(`/api/items/${createdItemId}`).send(updatedItem);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedItem.name);
  });

  it('should DELETE a texture item', async () => {
    const response = await request.delete(`/api/items/${createdItemId}`);
    expect(response.status).toBe(200);
  });
});

describe('User API', () => {
  let createdUserId;

  afterAll(async () => {
    if (createdUserId) {
        await User.findByIdAndDelete(createdUserId);
    }
  });

  it('should create a new user', async () => {
      const newUser = {
          username: 'testuser',
          password: 'test123',
          personalInfo: {
              fullName: 'Test User',
              dateOfBirth: '1990-01-01',
              gender: 'Other',
              nationality: 'Testland'
          },
          contactInfo: {
              email: 'testuser@example.com',
              phone: '1234567890',
              address: {
                  street: '123 Test St',
                  city: 'Testville',
                  state: 'TS',
                  zipCode: '12345',
                  country: 'Testland'
              }
          }
      };

      const response = await request.post('/api/users').send(newUser);
      createdUserId = response.body.userId;

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
  });

  it('should retrieve all users', async () => {
      const response = await request.get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should retrieve a user by ID', async () => {
      const response = await request.get(`/api/users/${createdUserId}`);
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(createdUserId);
  });

  it('should update a user', async () => {
      const updatedUserData = {
          personalInfo: {
              fullName: 'Updated Test User'
          }
      };

      const response = await request.put(`/api/users/${createdUserId}`).send(updatedUserData);
      expect(response.status).toBe(200);
      expect(response.body.personalInfo.fullName).toBe(updatedUserData.personalInfo.fullName);
  });

  it('should delete a user', async () => {
      const response = await request.delete(`/api/users/${createdUserId}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User deleted successfully');
  });
});
describe('Purchase API', () => {
  let createdUserId;
  let testItemQuantity = 100;

  beforeAll(async () => {
      // Create a test user
      const testUser = {
          username: 'purchaseTestUser',
          password: 'test123',
          personalInfo: { fullName: 'Purchase Test', dateOfBirth: '1990-01-01' },
          contactInfo: { email: 'purchaseTest@example.com' }
      };
      let userResponse = await request.post('/api/users').send(testUser);
      createdUserId = userResponse.body.userId;

      // Create a texture item to be purchased
      const newItem = {
          name: 'Test Texture',
          description: 'A test texture item',
          price: 10.99,
          inStock: true,
          quantity: testItemQuantity
      };
      let itemResponse = await request.post('/api/items').send(newItem);
      createdItemId = itemResponse.body._id;
      let quantity = itemResponse.body;
  });

  afterAll(async () => {
      // Cleanup: Delete the created texture item and test user
      await request.delete(`/api/items/${createdItemId}`);
      await request.delete(`/api/users/${createdUserId}`);
  });

  it('should successfully make a purchase', async () => {
      const purchaseData = {
          itemId: createdItemId,
          userId: createdUserId,
          quantity: 2
      };
      const response = await request.post('/api/purchase').send(purchaseData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('totalPrice', purchaseData.quantity * 10.99);
  });

  it('should not allow purchase of an unavailable item', async () => {
    const nonExistentItemId = '60baf16ec898a7c35ef69a55'; // Use an ID that doesn't exist in the database

    const purchaseData = {
        itemId: nonExistentItemId,
        userId: createdUserId,
        quantity: 1
    };

    const response = await request.post('/api/purchase').send(purchaseData);

    expect(response.status).toBe(404); // Assuming you return a 404 when an item is not found
});

  it('should not allow purchase with insufficient stock', async () => {
      const purchaseData = {
          itemId: createdItemId,
          userId: createdUserId,
          quantity: testItemQuantity + 500// More than available
      };
      const response = await request.post('/api/purchase').send(purchaseData);
      expect(response.status).toBe(400); // Assuming you return a 400 for insufficient stock
  });

  // Add more tests as necessary, for instance, invalid input, server errors, etc.
});

describe('Cost API', () => {
  let createdCostId;

  afterAll(async () => {
      if (createdCostId) {
          // Cleanup: Delete the created cost
          await request.delete(`/cost/${createdCostId}`);
      }
  });

  it('should create a cost for an item', async () => {
      const newItem = {
          name: 'Test Texture',
          description: 'A test texture item',
          price: 10.99,
          inStock: true,
          quantity: 100,
      };

      const itemResponse = await request.post('/api/items').send(newItem);
      const newCost = {
          itemId: itemResponse.body._id, // Use the item ID from the response
          costPrice: 5.99, // Adjust cost and selling prices as needed
          sellingPrice: 15.99,
      };

      const response = await request.post('/api/cost').send(newCost);
      createdCostId = response.body.cost.itemId; // Store the created cost ID for cleanup

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Cost created successfully');
  });

  it('should get the cost of an item by item ID', async () => {
      // Use the createdCostId to retrieve the cost
      const response = await request.get(`/api/cost/${createdCostId}`);
      expect(response.status).toBe(200);
      expect(response.body.itemId).toBe(createdCostId);
  });

  it('should update the cost of an item by item ID', async () => {
      // Use the createdCostId to update the cost
      const updatedCost = {
          costPrice: 6.99, // Update cost and selling prices as needed
          sellingPrice: 16.99,
      };

      const response = await request.put(`/api/cost/${createdCostId}`).send(updatedCost);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Cost updated successfully');
  });

  it('should delete the cost of an item by item ID', async () => {
      // Use the createdCostId to delete the cost
      const response = await request.delete(`/api/cost/${createdCostId}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Cost deleted successfully');
  });
});
describe('Order API', () => {
    let createdOrderId;
    let createdUserId;
    it('should create a new user', async () => {
        const newUser = {
            username: 'tes1tuser',
            password: 'test123',
            personalInfo: {
                fullName: 'Test User',
                dateOfBirth: '1990-01-01',
                gender: 'Other',
                nationality: 'Testland'
            },
            contactInfo: {
                email: 'testuser@example.com',
                phone: '1234567890',
                address: {
                    street: '123 Test St',
                    city: 'Testville',
                    state: 'TS',
                    zipCode: '12345',
                    country: 'Testland'
                }
            }
        };
  
        const response = await request.post('/api/users').send(newUser);
        createdUserId = response.body.userId;
  
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    it('should create a new order', async () => {
        const newOrder = {
            userId: createdUserId,
            role: 'user',
            itemId: '65bc2214f28d4ab89cbcb53b',
            clientName: 'John Doe',
            tasks: [
                { name: 'Task 1', completed: false },
                { name: 'Task 2', completed: false }
            ],
            priority: 'Medium',
            totalPrice: 21.98,
        };

        const response = await request.post('/api/orders').send(newOrder);
        console.log(response.body)
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Order created successfully');
        expect(response.body.order).toHaveProperty('_id');
        expect(response.body.order.clientName).toBe(newOrder.clientName);
        expect(response.body.order.tasks.length).toBe(newOrder.tasks.length);
        expect(response.body.order.priority).toBe(newOrder.priority);
        createdOrderId = response.body.order._id;
    });

    it('should retrieve all orders', async () => {
        const response = await request.get('/api/orders');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should retrieve an order by ID', async () => {
        const response = await request.get(`/api/orders/${createdOrderId}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(createdOrderId);
    });

    it('should update an order by ID', async () => {
        const updatedOrder = {
            tasks: [
                { name: 'Task 1', completed: true },
                { name: 'Task 2', completed: false }
            ],
            priority: 'High',
            totalPrice: 32.97,
        };

        const response = await request
            .put(`/api/orders/${createdOrderId}`)
            .send(updatedOrder);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Order updated successfully');
        expect(response.body.order.tasks[0].completed).toBe(true);
        expect(response.body.order.priority).toBe(updatedOrder.priority);
    });

 /*    it('should delete an order by ID', async () => {
        const response = await request.delete(`/api/orders/${createdOrderId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Order deleted successfully');
    }); */
});
afterAll(async () => {
  // Disconnect from MongoDB after all tests are done
  await mongoose.disconnect();
});