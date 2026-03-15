const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
// Path to your local questions - based on your folder structure in index.html
const { awsQuestions } = require("./cpc/js/questions.js"); 

// Initialize the client for Ohio
const client = new DynamoDBClient({ region: "us-east-2" }); 
const docClient = DynamoDBDocumentClient.from(client);

async function uploadQuestions() {
  console.log("🚀 Starting migration to Integrity_LMS_Table...");
  
  for (let i = 0; i < awsQuestions.length; i++) {
    const q = awsQuestions[i];
    
    const params = {
      TableName: "Integrity_LMS_Table",
      Item: {
        PK: "EXAM#CLF-C02", // Partition Key: Labels as Cloud Practitioner
        SK: `DOMAIN#${q.domain.replace(/\s/g, '')}#ID#${i}`, // Sort Key: Domain + ID
        QuestionText: q.question,
        Options: q.options,
        CorrectAnswer: q.answer,
        Explanation: q.explanation || "No explanation provided yet. Shanda AI will help with this later!"
      }
    };

    try {
      await docClient.send(new PutCommand(params));
      console.log(`✅ [${i+1}/${awsQuestions.length}] Uploaded: ${q.question.substring(0, 40)}...`);
    } catch (err) {
      console.error(`❌ Error on question ${i}:`, err.message);
    }
  }
  console.log("✨ Migration Complete! Check your AWS Console.");
}

uploadQuestions();