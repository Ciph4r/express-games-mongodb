const snarkyQuotes = (req ,res , next) => {
   
    let quote = [
      "Light travels faster than sound. This is why some people appear bright until they speak.” – Steven Wright",
      "When people ask me stupid questions, it is my legal obligation to give a sarcastic remark",
      "It’s okay if you don’t like me. Not everyone has good taste.",
      "You look good when your eyes are closed, but you look the best when my eyes closed.",
      "Mirrors can’t talk, lucky for you they can’t laugh either",
      "If had a dollar for every smart thing you say. I’ll be poor.",
      "Everyone seems normal until you get to know them.",
      "I’m sorry I hurt your feelings when I called you stupid. I really thought you already knew.",
      "Sarcasm: because arguing with stupid people just wouldn’t be as much fun.",
      "Sarcasm is the secret language that everyone uses when they want to say something mean to your face."
  ]

    const randomNUM = Math.ceil(Math.random() * quote.length)
     console.log(quote[randomNUM -1 ])
    next()
}
module.exports = snarkyQuotes