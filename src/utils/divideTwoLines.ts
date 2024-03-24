const divideTwoLines = (text: string) => {
    const words = text.split(' ');
    let line1: string[] = [];
    let line2: string[] = [];
    let totalLength = text.length;
    let currentLength = 0;

    for (let i = 0; i < words.length; i++) {
        if (currentLength + words[i].length <= totalLength / 2) {
            line1.push(words[i]);
            currentLength += words[i].length + 1;
        } else {
            line2 = words.slice(i);
            break;
        }
    }

        return [line1.join(' '), line2.join(' ')];
};

export default divideTwoLines;