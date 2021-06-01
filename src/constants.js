export const COSTS = {
    "pizza": 8,
    "pasta": 8,
    "cauliflower crust": 2,
    "extra slice": 4,
    "extra cheese": 0.75,
    "gluten-free noodles": 2,
    "XL serving": 4
};

export const OPTIONS = {
    pizza: {
        key: "pizza",
        displayText: "Pizza Box",
        cost: 8,
        description: "Includes 2 slices of pizza and a side salad",
        customizations: ["cauliflower crust", "extra slice", "extra cheese"],
    },
    pasta: {
        key: "pasta",
        displayText: "Pasta Box",
        cost: 8,
        description: "Includes pasta helping and a breadstick",
        customizations: ["gluten-free noodles", "XL serving"],
    },
};

export const DEFAULT = {
    box: "",
    customize: [],
    address: { name: '', address: '', notes: ''}
};