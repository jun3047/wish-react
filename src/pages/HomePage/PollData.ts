const questions = [
    "너의 제일 멋진 사진이 궁금해",
    "1너의 제일 멋진 사진을 보여줘",
    "2너의 제일 멋진 사진을 보여줘",
    "3너의 제일 멋진 사진을 보여줘",
    "4너의 제일 멋진 사진을 보여줘",
    "5너의 제일 멋진 사진을 보여줘",
    "6너의 제일 멋진 사진을 보여줘",
    "7너의 제일 멋진 사진을 보여줘"
]

const randomQuestion = (beforeQuestion: string) => {

    const filterQuestion = questions.filter((question) => question !== beforeQuestion)
    return filterQuestion[Math.floor(Math.random()*filterQuestion.length)]
}

export default randomQuestion