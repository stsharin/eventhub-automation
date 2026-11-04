export const validUser = {
    email: process.env.EVENTHUB_EMAIL!,
    password: process.env.EVENTHUB_PASSWORD!,
};

export const newUser = {
    password: 'passworD123#',
    differentPassword: 'passworD456#',
};

export const invalidData = {
    email: 'abc',
    weakPassword: 'abc123',
    wrongPassword: 'wrongPass1!',
    unregisteredEmail: 'notregistered12345@example.com',
    phone: '12345',
};

export const customer = {
    name: 'Sharin Test',
    phone: '9876543210',
};

export const featuredEvent = {
    name: 'Dilli Diwali Mela',
    venue: 'Pragati Maidan Exhibition Grounds',
    city: 'Delhi',
    category: 'Festival',
    ticketPrice: '$300',
};

export const otherEvents = {
    concert: 'Hollywood Monsoon Night — Los Angeles',
    conference: 'World Tech Summit',
};

export const adminEvent = {
    description: 'Test event created by automation.',
    category: 'Workshop',
    city: 'Mumbai',
    venue: 'Test Hall',
    futureDate: '2027-12-15T18:00',
    pastDate: '2025-01-10T18:00',
    price: '100',
    seats: '50',
};
