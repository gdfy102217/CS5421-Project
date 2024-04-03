export const difficultyLevels = ["Easy", "Medium", "Hard"]
export const attributes = {
  Easy: ["A", "B", "C"],
  Medium: ["A", "B", "C", "D", "E"],
  Hard: ["A", "B", "C", "D", "E", "F", "G"]
}
export const functionalDependencies = {
  Easy: [
    {
      lhs: ['A'],
      rhs: ['B'],
    },
    {
      lhs: ['B'],
      rhs: ['C'],
    }
  ],
  Medium: [
    {
      lhs: ['A', 'B'],
      rhs: ['C', 'D'],
    },
    {
      lhs: ['D'],
      rhs: ['E'],
    }
  ],
  Hard: [
    {
      lhs: ['A', 'B'],
      rhs: ['C', 'D'],
    },
    {
      lhs: ['E', 'G'],
      rhs: ['A', 'C'],
    },
    {
      lhs: ['D'],
      rhs: ['E'],
    },
    {
      lhs: ['F'],
      rhs: ['E', 'G'],
    },
  ]
}