export const initialNodes = [
  {
    id: "1",
    type: "UMLClassNode",
    position: { x: 100, y: 100 },
    data: {
      name: "Person",
      attributes: ["+name: string", "+age: int"],
      methods: ["+getName(): string", "+getAge(): int"],
    },
  },
  {
    id: "2",
    type: "UMLClassNode",
    position: { x: 300, y: 100 },
    data: {
      name: "Another Person",
      attributes: ["+name: string", "+age: int"],
      methods: ["+getName(): string", "+getAge(): int"],
      notes: ["first", "second"]
    },
  },
];
