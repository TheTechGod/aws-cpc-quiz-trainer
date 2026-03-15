const oleQuestions = [
    {
        question: "Which AWS is used for oject storage",
        options: ["S3", "EC2", "Lambda", "RDS"],
        answer: 1,
        domain: "Technology"
    }
    // ... more questions
];

const migratedQuestions = oleQuestions.map(q, index) => {
    return {
        PK: "EXAM#CLF-C02", // Hardcoded for this batch
        SK: `DOMAIN#${q.domain.replace(/\s/g, '')}#ID#${index}`, 
        QuestionText: q.question,
        Options: q.Options || q.options,
        CorrectAnswer: q.answer,
        Explanation: q.explanation || "No explanation provided."
    };
};

console.log(JSON.stringify(migratedQuestions, null, 2));