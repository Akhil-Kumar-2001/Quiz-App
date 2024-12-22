export type categoryType = {
    _id: string,
    category: string,
    updatedAt: string
  }

  export type Question  = {
    question: string,
    options: string[],
    correctOption:string
  }