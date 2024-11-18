const { handler } = require('./index'); // Path to your Lambda handler function

describe('AWS Lambda Function Tests', () => {
    // Mock Lambda event if necessary
    let mockEvent;

    beforeAll(() => {
        mockEvent = {
            operation: 'add',
            num1: 10,
            num2: 5,
        };
    });

    test('Addition operation should return correct result', async () => {
        const result = await handler(mockEvent);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.result).toBe(155); // Expected result
    });

    test('Subtraction operation should return correct result', async () => {
        const event = { operation: 'subtract', num1: 10, num2: 5 };
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.result).toBe(5); // Expected result
    });

    test('Multiplication operation should return correct result', async () => {
        const event = { operation: 'multiply', num1: 10, num2: 5 };
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.result).toBe(50); // Expected result
    });

    test('Division operation (valid) should return correct result', async () => {
        const event = { operation: 'divide', num1: 10, num2: 2 };
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.result).toBe(5); // Expected result
    });

    test('Division operation (division by zero) should return error message', async () => {
        const event = { operation: 'divide', num1: 10, num2: 0 };
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.result).toBe("Cannot divide by zero"); // Expected result
    });

    test('Invalid input (missing operation) should return error message', async () => {
        const event = { num1: 10, num2: 5 }; // Missing operation
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(500);
        expect(body.message).toBe("Invalid input: Ensure operation, num1, and num2 are provided and valid.");
    });

    test('Invalid input (missing num1) should return error message', async () => {
        const event = { operation: 'add', num2: 5 }; // Missing num1
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(500);
        expect(body.message).toBe("Invalid input: Ensure operation, num1, and num2 are provided and valid.");
    });

    test('Invalid input (missing num2) should return error message', async () => {
        const event = { operation: 'add', num1: 10 }; // Missing num2
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(500);
        expect(body.message).toBe("Invalid input: Ensure operation, num1, and num2 are provided and valid.");
    });

    test('Invalid operation should return error message', async () => {
        const event = { operation: 'modulo', num1: 10, num2: 5 }; // Invalid operation
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(500);
        expect(body.message).toBe("Invalid operation");
    });
});
