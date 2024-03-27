const questions = [
    "너의 제일 멋진 사진이 궁금해",
    "너가 생각하는, 너의 모습이 가장 멋져 보이는 사진은 뭐야?",
    "가장 마음에 드는 셀카가 보고싶어",
    "너의 인생 사진은 뭐야?",
    "친구들이랑 찍은 사진 중 가장 좋아하는 사진?",
    "가장 행복할 때 찍은 사진은?",
    "가장 좋아하는 포즈로 찍은 사진을 보고 싶어",
    "가장 마지막으로 찍은 셀카는 어떤 모습이야?",
    "제일 자랑하고 싶은 사진이 궁금해",
    "애인한테만 보여줄 법한 사진이 보고싶어",
    "너가 제일 좋아하는 계절에 찍은 사진이 있어?",
    "가장 최근에 찍은 사진이 궁금해",
    "너의 짱친과 찍은 사진을 보여줘",
    "설레게 웃는 모습이 보고싶어",
    "너의 취미 생활을 보여주는 사진이 있어?",
]

const randomQuestion = (beforeQuestion: string) => {

    const filterQuestion = questions.filter((question) => question !== beforeQuestion)
    return filterQuestion[Math.floor(Math.random()*filterQuestion.length)]
}

export default randomQuestion