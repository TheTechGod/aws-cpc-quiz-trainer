const questions = [
 // === Cloud Concepts ===
  {
    id: "Cloud_01",
    domain: "Cloud Concepts",
    question: "Which factors are MOST important to consider when selecting an AWS Region? (Select TWO.)",
    options: [
      "Any regulatory compliance standards the agency requires",
      "Proximity to users",
      "Number of files stored",
      "Personal preference of the CIO",
      "How recently the Region was constructed"
    ],
    answer: [
      "Any regulatory compliance standards the agency requires",
      "Proximity to users"
    ],
    explanation: "When selecting a Region, consider compliance requirements and proximity to users to meet regulations and minimize latency."
  },
  {
    id: "Cloud_02",
    domain: "Cloud Concepts",
    question: "What is the AWS shared responsibility model?",
    options: [
      "AWS manages security of the cloud; customers manage security in the cloud",
      "Customers manage all aspects of security and compliance",
      "AWS is responsible for customer data security only",
      "Both AWS and customers share identical responsibilities for all security tasks"
    ],
    answer: "AWS manages security of the cloud; customers manage security in the cloud",
    explanation: "AWS secures the infrastructure running cloud services, while customers secure data, configurations, and access inside the cloud."
  },
  {
    id: "Cloud_03",
    domain: "Cloud Concepts",
    question: "Which statement BEST describes the benefit of the AWS Cloud’s pay-as-you-go pricing model?",
    options: [
      "You pay only for the services you use without long-term contracts or upfront costs",
      "You must commit to a fixed monthly price for predictable billing",
      "You pay in advance for all resources to guarantee capacity",
      "You pay the same regardless of how much you use"
    ],
    answer: "You pay only for the services you use without long-term contracts or upfront costs",
    explanation: "Pay-as-you-go pricing allows scaling up or down as needed, reducing costs compared to traditional fixed infrastructure."
  },
  {
    id: "Cloud_04",
    domain: "Cloud Concepts",
    question: "Which AWS tool helps estimate monthly costs for a solution before deploying it?",
    options: [
      "AWS Budgets",
      "AWS Pricing Calculator",
      "AWS Cost Explorer",
      "AWS Trusted Advisor"
    ],
    answer: "AWS Pricing Calculator",
    explanation: "The AWS Pricing Calculator lets you model architecture and estimate costs before deployment."
  },
  {
    id: "Cloud_05",
    domain: "Cloud Concepts",
    question: "Which of the following BEST describes the AWS global infrastructure?",
    options: [
      "A collection of physical servers that run customer applications",
      "A network of Regions, Availability Zones, and Edge Locations",
      "Data centers managed by third-party hosting providers",
      "A global CDN that stores cached data only"
    ],
    answer: "A network of Regions, Availability Zones, and Edge Locations",
    explanation: "AWS global infrastructure includes multiple Regions (geographic areas), Availability Zones (isolated data centers), and Edge Locations (for content delivery)."
  },
  {
    id: "Cloud_06",
    domain: "Cloud Concepts",
    question: "Which AWS service provides visibility into user activity and API usage across your AWS account?",
    options: [
      "AWS CloudTrail",
      "Amazon CloudWatch",
      "AWS Config",
      "AWS Trusted Advisor"
    ],
    answer: "AWS CloudTrail",
    explanation: "CloudTrail records account activity and API calls for governance, compliance, and auditing."
  },
  {
    id: "Cloud_07",
    domain: "Cloud Concepts",
    question: "What is the primary benefit of migrating workloads to the AWS Cloud?",
    options: [
      "Eliminating all operational costs",
      "Reducing the need for network connectivity",
      "Gaining elasticity and scalability while paying only for usage",
      "Avoiding security responsibilities"
    ],
    answer: "Gaining elasticity and scalability while paying only for usage",
    explanation: "The cloud enables on-demand scaling and flexible pricing, allowing organizations to match resources to actual demand."
  },
  {
    id: "Cloud_08",
    domain: "Cloud Concepts",
    question: "Which AWS service provides a consistent way to deploy and manage infrastructure as code?",
    options: [
      "AWS Elastic Beanstalk",
      "AWS CloudFormation",
      "AWS OpsWorks",
      "AWS Systems Manager"
    ],
    answer: "AWS CloudFormation",
    explanation: "CloudFormation automates deployment of infrastructure through code templates for consistent environments."
  },
  {
    id: "Cloud_09",
    domain: "Cloud Concepts",
    question: "Which AWS service or feature helps protect against Distributed Denial of Service (DDoS) attacks?",
    options: [
      "AWS Shield",
      "AWS WAF",
      "Amazon Inspector",
      "AWS Artifact"
    ],
    answer: "AWS Shield",
    explanation: "AWS Shield provides managed DDoS protection for AWS resources and applications."
  },
  {
    id: "Cloud_10",
    domain: "Cloud Concepts",
    question: "Which statement BEST describes AWS Availability Zones?",
    options: [
      "They are separate data centers within an AWS Region, designed for high availability and fault tolerance",
      "They are local caching servers for CloudFront",
      "They represent user accounts in AWS",
      "They are used only for AWS government workloads"
    ],
    answer: "They are separate data centers within an AWS Region, designed for high availability and fault tolerance",
    explanation: "Each Region has multiple AZs that are physically separated to minimize risk of simultaneous failure."
  },
  {
    id: "Cloud_11",
    domain: "Cloud Concepts",
    question: "In our coffee shop example, a barista and customer were used to represent the client-server model. Which scenario BEST describes how the client-server model works in this analogy?",
    options: [
      "The customer takes a cup of coffee from a self-serve station without informing the barista. This describes how a client and server do not interact.",
      "The barista proactively prepares a coffee and brings it to the customer without being asked. This describes how the client does not need to submit a request to the server.",
      "The customer makes their own coffee using the coffee shop equipment without interacting with the barista. This describes how the client does not require the server.",
      "The customer goes to the barista and places an order for a coffee. The barista prepares the coffee and hands it back to the customer. This describes how the client places the request, and the server responds."
    ],
    answer: "The customer goes to the barista and places an order for a coffee. The barista prepares the coffee and hands it back to the customer. This describes how the client places the request, and the server responds.",
    explanation: "The client-server model works by having the client send a request to the server, which processes the request and sends back a response. The barista preparing and serving coffee represents this exchange."
  },
  {
    id: "Cloud_12",
    domain: "Cloud Concepts",
    question: "You work for a local charity organization. Your organization has sensitive data that must remain within your country for compliance reasons. However, you also need a solution that can scale quickly to handle seasonal spikes in demand. You decide to keep on-premises resources for compliance and use cloud-based resources for dynamic scaling. Which type of cloud deployment does this situation describe?",
    options: [
      "On-premises deployment",
      "Public cloud deployment",
      "Hybrid deployment",
      "Data-compliance deployment"
    ],
    answer: "Hybrid deployment",
    explanation: "A hybrid cloud deployment combines on-premises resources with cloud-based infrastructure. It allows sensitive data to remain on-premises for compliance while using the cloud for scalable and flexible workloads."
  },
  {
    id: "Cloud_13",
    domain: "Cloud Concepts",
    question: "A retail business plans to launch a new line of clothing, but they are struggling with accurately predicting how much server capacity they will need to support the launch. Which benefit of the AWS Cloud is most relevant to this situation?",
    options: [
      "Stop spending money to run and maintain data centers.",
      "Stop guessing capacity.",
      "Trade upfront expense for variable expense.",
      "Go global in minutes."
    ],
    answer: "Stop guessing capacity.",
    explanation: "AWS removes the need to estimate capacity requirements. You can scale resources up or down automatically to match demand, ensuring performance without overprovisioning or underutilization."
  },
  {
    id: "Cloud_14",
    domain: "Cloud Concepts",
    question: "You just joined a tech start-up, and the business is growing rapidly. Your new company decides that they need to design a resilient and scalable infrastructure on AWS to handle increased traffic and help ensure high availability. Which statement BEST describes the AWS Global Infrastructure benefit of high availability?",
    options: [
      "AWS stores all of your website’s data in a single AWS storage bucket to centralize data management.",
      "AWS has many customer support options to make sure the answers to your questions are highly available on its website.",
      "AWS provides multiple data centers across different geographic regions so your website can remain operational even if one location faces issues.",
      "AWS offers a single, highly secure data center that can handle all your traffic, which makes sure that your website is available."
    ],
    answer: "AWS provides multiple data centers across different geographic regions so your website can remain operational even if one location faces issues.",
    explanation: "AWS achieves high availability through its global infrastructure of Regions and Availability Zones. If one data center fails, workloads can automatically shift to another, minimizing downtime and maintaining service continuity."
  },
  {
    id: "Cloud_15",
    domain: "Cloud Concepts",
    question: "Your company is planning to launch a new web application that will serve users around the world. To help ensure the application performs well and remains reliable, the IT team plans to use AWS for its vast global infrastructure. What BEST describes the benefits of AWS Global Infrastructure related to this situation? (Select TWO.)",
    options: [
      "Fault tolerance",
      "Cost savings",
      "Ease of use",
      "High availability",
      "Compliance with regulatory standards"
    ],
    answer: ["Fault tolerance", "High availability"],
    explanation: "AWS Global Infrastructure provides multiple Regions and Availability Zones that allow applications to remain operational even during component failures. This design enhances both fault tolerance and high availability for global workloads."
  },
  {
    id: "Cloud_16",
    domain: "Cloud Concepts",
    question: "A large enterprise is looking to lower operational costs. They are hoping to reduce the operational overhead associated with managing their own physical infrastructure. Which choice BEST describes which advantage of the cloud this enterprise can benefit from?",
    options: [
      "Benefit from massive economies of scale",
      "Stop guessing capacity",
      "Stop spending money running and maintaining data centers",
      "Increase speed and agility"
    ],
    answer: "Stop spending money running and maintaining data centers",
    explanation: "One of the core advantages of cloud computing is eliminating the need to manage physical data centers. AWS handles infrastructure operations, allowing organizations to reduce costs and focus on innovation."
  },
  {
    id: "Cloud_17",
    domain: "Cloud Concepts",
    question: "You work for a sports apparel company that is expanding its operations to global customers. The company wants to deploy resources to multiple AWS locations to achieve high availability. You are tasked with explaining the basics of AWS Global Infrastructure to your chief operating officer (COO). The COO needs help understanding the difference between AWS Regions and Availability Zones. Which statement BEST describes the difference between AWS Regions and Availability Zones?",
    options: [
      "An Availability Zone spans multiple physical locations across Regions, and Regions are located across the world.",
      "A Region is a geographical location that contains three or more Availability Zones. An Availability Zone is a distinct location within a Region that contains one or more discrete data centers.",
      "An Availability Zone is a geographical location that contains three or more Regions. A Region is a distinct location within an Availability Zone that contains one or more discrete data centers.",
      "A Region is a single data center, and an Availability Zone consists of multiple data centers."
    ],
    answer: "A Region is a geographical location that contains three or more Availability Zones. An Availability Zone is a distinct location within a Region that contains one or more discrete data centers.",
    explanation: "An AWS Region is a distinct geographic area with multiple Availability Zones. Each Availability Zone is an isolated data center or group of data centers within that Region, enabling fault tolerance and high availability."
  },
  {
    id: "Cloud_18",
    domain: "Cloud Concepts",
    question: "A government agency wants to maintain complete control over its IT infrastructure, but plans to use AWS Cloud services for specific applications. Which deployment type is BEST for this situation?",
    options: ["Cloud", "Compliance", "Hybrid", "On-premises"],
    answer: "Hybrid",
    explanation: "A hybrid deployment allows an organization to maintain on-premises infrastructure while integrating specific applications or workloads with the AWS Cloud. This provides flexibility and control while benefiting from cloud scalability."
  },
  {
    id: "Cloud_19",
    domain: "Cloud Concepts",
    question: "A small business is considering migrating their IT infrastructure to the cloud. The finance team has a meeting with the IT department to discuss the costs associated with this transition. During the meeting, the finance manager says they like the idea of the reliability that comes with the cloud, but they are worried about the fixed costs. Which statement accurately defines the cloud computing model and addresses the finance manager's concern?",
    options: [
      "Cloud computing is basically just using someone else's server to host your website, and it does not offer any sort of significant cost advantages over traditional hosting solutions.",
      "Cloud computing is a model for delivering IT resources over the internet. Businesses can rent services on a pay-as-you-go basis, which can help reduce fixed costs and allow for more flexible budgeting.",
      "Cloud computing reduces the need for additional hardware but still involves significant fixed monthly fees.",
      "Cloud computing involves purchasing dedicated servers and setting up a private data center. This model often comes with fixed costs related to hardware and maintenance."
    ],
    answer: "Cloud computing is a model for delivering IT resources over the internet. Businesses can rent services on a pay-as-you-go basis, which can help reduce fixed costs and allow for more flexible budgeting.",
    explanation: "Cloud computing provides on-demand access to IT resources via the internet using a pay-as-you-go model. This reduces large fixed capital expenses and allows companies to scale costs based on actual usage."
  },
  {
    id: "Cloud_20",
    domain: "Cloud Concepts",
    question: "What is the primary benefit of scalability and elasticity in AWS?",
    options: [
      "The ability to manually adjust resources based on peak usage",
      "The ability to grow and shrink resources dynamically based on real-time demand",
      "The ability to create fixed resources that never change in size",
      "The ability to permanently increase resource capacity for long-term growth"
    ],
    answer: "The ability to grow and shrink resources dynamically based on real-time demand",
    explanation: "Scalability and elasticity allow AWS resources to automatically adjust to changing workloads. This ensures performance during peak demand while optimizing costs during low activity periods."
  },
  {
    id: "Cloud_21",
    domain: "Cloud Concepts",
    question: "How does AWS make sure that a business can meet fluctuating demand without over-provisioning resources?",
    options: [
      "By providing fixed resources that are always available",
      "By allowing businesses to provision resources that automatically scale based on demand",
      "By requiring businesses to purchase excess resources in advance to handle peak demand",
      "By offering resources that are always running, regardless of demand"
    ],
    answer: "By allowing businesses to provision resources that automatically scale based on demand",
    explanation: "AWS enables businesses to scale resources up or down automatically in response to demand. This elasticity ensures performance during peak times while reducing costs when usage drops."
  },



  // === Technology ===
  {
  id: "Tech_01",
  domain: "Technology",
  question: "Which AWS service provides virtual servers in the cloud?",
  options: ["Amazon EC2", "AWS Lambda", "Amazon S3", "AWS Elastic Beanstalk"],
  answer: "Amazon EC2",
  explanation: "Amazon EC2 offers resizable compute capacity—virtual machines that you can configure and scale for various workloads."
},
{
  id: "Tech_02",
  domain: "Technology",
  question: "Which AWS service automatically provisions and scales web applications without requiring you to manage infrastructure?",
  options: ["AWS Elastic Beanstalk", "AWS CloudFormation", "AWS OpsWorks", "AWS Lambda"],
  answer: "AWS Elastic Beanstalk",
  explanation: "Elastic Beanstalk handles deployment, load balancing, and scaling so developers can focus on code rather than servers."
},
{
  id: "Tech_03",
  domain: "Technology",
  question: "Which compute service lets you run code without provisioning or managing servers?",
  options: ["Amazon EC2", "AWS Fargate", "AWS Lambda", "Amazon Lightsail"],
  answer: "AWS Lambda",
  explanation: "Lambda executes code in response to events and automatically manages compute resources, enabling serverless computing."
},
{
  id: "Tech_04",
  domain: "Technology",
  question: "Which AWS service provides managed containers that can run Docker applications?",
  options: ["Amazon ECS", "AWS Batch", "Amazon EC2", "AWS Elastic Beanstalk"],
  answer: "Amazon ECS",
  explanation: "Amazon ECS is a fully managed container orchestration service that runs and scales Docker containers."
},
{
  id: "Tech_05",
  domain: "Technology",
  question: "Which AWS service allows you to deploy and manage virtual private servers easily with preconfigured options?",
  options: ["Amazon Lightsail", "AWS Batch", "Amazon EC2", "AWS Elastic Beanstalk"],
  answer: "Amazon Lightsail",
  explanation: "Amazon Lightsail provides simplified virtual servers with predictable pricing—ideal for smaller projects or quick setups."
},
{
  id: "Tech_06",
  domain: "Technology",
  question: "Which AWS database service is a managed NoSQL database that delivers single-digit millisecond performance?",
  options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon Aurora"],
  answer: "Amazon DynamoDB",
  explanation: "DynamoDB is a fully managed NoSQL database service providing fast, consistent performance and seamless scalability."
},
{
  id: "Tech_07",
  domain: "Technology",
  question: "Which AWS service provides fully managed relational databases?",
  options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon ElastiCache"],
  answer: "Amazon RDS",
  explanation: "Amazon RDS simplifies setup, operation, and scaling of relational databases like MySQL, PostgreSQL, and SQL Server."
},
{
  id: "Tech_08",
  domain: "Technology",
  question: "Which AWS service helps developers monitor applications and infrastructure performance using metrics and alarms?",
  options: ["AWS CloudTrail", "Amazon CloudWatch", "AWS Config", "AWS Trusted Advisor"],
  answer: "Amazon CloudWatch",
  explanation: "CloudWatch collects metrics and logs, and enables alarms for operational visibility and automated responses."
},
{
  id: "Tech_09",
  domain: "Technology",
  question: "Which AWS service automates infrastructure deployment using reusable templates?",
  options: ["AWS OpsWorks", "AWS CloudFormation", "AWS Elastic Beanstalk", "AWS Systems Manager"],
  answer: "AWS CloudFormation",
  explanation: "CloudFormation defines infrastructure as code to provision AWS resources consistently and repeatedly."
},
{
  id: "Tech_10",
  domain: "Technology",
  question: "Which AWS service can be used for running batch computing workloads at scale?",
  options: ["AWS Batch", "AWS Lambda", "AWS Fargate", "AWS CloudFormation"],
  answer: "AWS Batch",
  explanation: "AWS Batch efficiently runs hundreds or thousands of batch computing jobs by dynamically provisioning resources."
},
{
  id: "Tech_11",
  domain: "Technology",
  question: "A developer is building an application that processes large amounts of data and requires high I/O performance. After processing the data for an operation, the results are displayed to the user and do not need to be retained long-term. Unfortunately, the application's current storage solution is experiencing performance bottlenecks during peak processing times. How could implementing an EC2 instance store improve the performance of the application?",
  options: [
    "EC2 instance store provides high I/O performance for temporary storage needs.",
    "EC2 instance store reduces overall storage costs by offering the cheapest per-gigabyte storage option in AWS.",
    "EC2 instance store provides a persistent storage solution that survives instance failures.",
    "EC2 instance store allows storage to be conveniently shared between multiple EC2 instances simultaneously."
  ],
  answer: "EC2 instance store provides high I/O performance for temporary storage needs.",
  explanation: "EC2 instance store is physically attached to the host and offers extremely low latency and high I/O performance. It is ideal for temporary storage that does not need to persist after instance termination."
},
{
  id: "Tech_12",
  domain: "Technology",
  question: "AnyCompany Finance is designing an application that requires consistent and low-latency access to financial data. They're looking for a storage solution that provides persistent block storage. Why would Amazon EBS be suitable to store data in this scenario?",
  options: [
    "Amazon EBS allows sharing volumes across multiple AWS Regions without any latency impact.",
    "Amazon EBS automatically scales volume capacity without requiring any volume modifications.",
    "Amazon EBS provides unlimited input/output operations per second (IOPS) for all volume types, regardless of size.",
    "Amazon EBS provides high availability and durability by automatically replicating volumes within the same Availability Zone."
  ],
  answer: "Amazon EBS provides high availability and durability by automatically replicating volumes within the same Availability Zone.",
  explanation: "Amazon Elastic Block Store (EBS) provides persistent block-level storage for EC2 instances with high availability and durability by automatically replicating data within the same Availability Zone."
},
{
  id: "Tech_13",
  domain: "Technology",
  question: "AnyCompany Software is migrating their on-premises application architecture to AWS. They are particularly concerned about data persistence because in their current environment, they have experienced data loss when virtual machines (VMs) crashed. They want to understand how Amazon Elastic Block Store (Amazon EBS) can help address their data persistence requirements when they move their workloads to Amazon EC2 instances. How does Amazon EBS solve the data persistence issue described in this scenario?",
  options: [
    "EBS automatically synchronizes data with Amazon S3 every 5 minutes, ensuring that if an EC2 instance crashes, all data can be immediately restored from the S3 backup.",
    "Amazon EBS caches all data in memory for instant recovery when instances are restarted.",
    "Amazon EBS volumes exist independently from the instance and persist even after the instance is terminated.",
    "Amazon EBS automatically backs up all data to Amazon S3 every hour to help ensure persistence."
  ],
  answer: "Amazon EBS volumes exist independently from the instance and persist even after the instance is terminated.",
  explanation: "Amazon EBS volumes are persistent block storage devices that exist independently from EC2 instances. Even if an instance fails or is terminated, the data on the EBS volume remains intact until the volume itself is deleted."
},
{
  id: "Tech_14",
  domain: "Technology",
  question: "AnyCompany Commerce operates an online trading platform experiencing rapid growth. Their development team frequently needs to create test environments that mirror production for testing new features, but setting up these environments has become time-consuming and error-prone. What is the most significant benefit of using EBS snapshots in this scenario?",
  options: [
    "EBS snapshots enable rapid creation of new volumes from existing data, so you can quickly deploy identical test environments that mirror production.",
    "EBS snapshots automatically optimize the performance of your EBS volumes by defragmenting data during the snapshot process.",
    "EBS snapshots reduce your storage costs by compressing all data on your EBS volumes by up to 90 percent.",
    "EBS snapshots automatically migrate your data to different AWS Regions for improved global access speeds."
  ],
  answer: "EBS snapshots enable rapid creation of new volumes from existing data, so you can quickly deploy identical test environments that mirror production.",
  explanation: "EBS snapshots allow you to back up the state of an EBS volume and quickly create new volumes from those snapshots. This enables fast and consistent replication of production environments for testing or staging."
},
{
  id: "Tech_15",
  domain: "Technology",
  question: "AnyCompany Healthcare manages thousands of EBS volumes containing patient records. They need to ensure that this data is properly backed up, retained according to compliance requirements, and old snapshots are removed to control costs. Which problem does AWS Data Lifecycle Manager primarily solve in this scenario?",
  options: [
    "Providing real-time monitoring of EBS volume performance metrics",
    "Encrypting sensitive patient data stored on EBS volumes",
    "Automating the creation, retention, and deletion of EBS snapshots and EBS backed Amazon Machine Images (AMIs) according to a schedule",
    "Migrating patient data from on-premises storage to AWS Cloud storage"
  ],
  answer: "Automating the creation, retention, and deletion of EBS snapshots and EBS backed Amazon Machine Images (AMIs) according to a schedule",
  explanation: "AWS Data Lifecycle Manager (DLM) allows you to automate the creation, retention, and deletion of EBS snapshots and AMIs, ensuring compliance while reducing manual management and cost overhead."
},
{
  id: "Tech_16",
  domain: "Technology",
  question: "AnyCompany Mobile is evaluating cloud storage solutions for their new mobile application. They need a reliable service that can handle various types of data storage requirements as their user base grows. Based on this scenario, what is an aspect of Amazon S3 that they could use in this scenario?",
  options: [
    "Running relational database queries for user authentication",
    "Hosting virtual machines (VMs) to process application logic",
    "Real-time data streaming and message processing",
    "Storing and distributing mobile application content and user-generated media files"
  ],
  answer: "Storing and distributing mobile application content and user-generated media files",
  explanation: "Amazon S3 provides object storage for data of any type and scale. It is ideal for storing and distributing mobile app content such as images, videos, and user-generated files, offering high durability and scalability."
},
{
  id: "Tech_17",
  domain: "Technology",
  question: "AnyCompany Marketing has created an Amazon S3 bucket to host images for their new website. The images need to be accessible to anyone visiting the website without authentication. After uploading the images to the bucket, users report they cannot access them, even though the bucket policy is set to allow public access. What is the most likely cause of this access issue?",
  options: [
    "The images are not properly tagged with public read permissions.",
    "Block public access settings are enabled at the account or bucket level.",
    "They need to enable the website hosting feature to make any Amazon S3 content public.",
    "The S3 bucket must be in the same AWS Region as the users trying to access the content."
  ],
  answer: "Block public access settings are enabled at the account or bucket level.",
  explanation: "Even if a bucket policy allows public access, S3’s Block Public Access feature can override it. If enabled at the account or bucket level, it prevents any public access until explicitly disabled."
},
{
  id: "Tech_18",
  domain: "Technology",
  question: "AnyCompany Media is looking for a new cloud storage solution. They distribute large video files to users around the world, and are looking for a service that is highly durable, scalable, and offers various access control mechanisms. Based on this scenario, which Amazon S3 feature would be particularly beneficial?",
  options: [
    "Amazon S3 offers 99.999999999 percent (11 nines) of durability for objects stored across multiple Availability Zones. This maintains highly available for their video content and protects it against data loss.",
    "Amazon S3 automatically compresses all stored objects to reduce storage costs by up to 90 percent, making it ideal for large video files.",
    "Amazon S3 limits individual object sizes to 5 GB, requiring companies to split large video files before upload.",
    "Amazon S3 provides built-in video transcoding services that automatically convert videos to different formats when they are uploaded."
  ],
  answer: "Amazon S3 offers 99.999999999 percent (11 nines) of durability for objects stored across multiple Availability Zones. This maintains highly available for their video content and protects it against data loss.",
  explanation: "Amazon S3 is designed for 99.999999999% durability by redundantly storing data across multiple Availability Zones, ensuring protection against data loss for critical media and large file workloads."
},
{
  id: "Tech_19",
  domain: "Technology",
  question: "AnyCompany Business stores a growing amount of customer data in Amazon S3. Their manager is concerned about storage costs and asks IT to implement a solution to move older data to cheaper storage. The data is frequently accessed for the first 30 days, occasionally accessed for the next 60 days, and rarely accessed after 90 days. What should they do in this situation to optimize costs while maintaining appropriate access to the data?",
  options: [
    "Create a lifecycle rule to transition objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days, transition to S3 Glacier after 90 days.",
    "Create a lifecycle rule to immediately transition all objects to S3 Glacier and set up a restore policy.",
    "Create a lifecycle rule to delete all objects after 90 days and rely on database backups.",
    "Create multiple S3 buckets with different storage classes and manually move objects between buckets as they age."
  ],
  answer: "Create a lifecycle rule to transition objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days, transition to S3 Glacier after 90 days.",
  explanation: "S3 Lifecycle rules automate the transition of objects between storage classes based on age and access patterns. Using S3 Standard for active data, S3 Standard-IA after 30 days, and S3 Glacier after 90 days optimizes cost while maintaining access when needed."
},
{
  id: "Tech_20",
  domain: "Technology",
  question: "Which statement BEST describes S3 Lifecycle?",
  options: [
    "A backup service that creates copies of your S3 objects in different AWS Regions to protect against Regional failures.",
    "A feature that automatically compresses Amazon S3 objects after a certain period to reduce storage costs.",
    "A monitoring system that alerts administrators when Amazon S3 objects have not been accessed for a specified period.",
    "A feature used to define rules to automatically transition objects between different storage classes, or delete them based on age or usage patterns."
  ],
  answer: "A feature used to define rules to automatically transition objects between different storage classes, or delete them based on age or usage patterns.",
  explanation: "Amazon S3 Lifecycle allows you to define rules that automatically transition objects between storage classes or delete them after a set time. It helps reduce costs by moving data to cheaper tiers as it becomes less frequently accessed."
},

  // === Networking & Content Delivery ===
  {
  id: "Network_01",
  domain: "Networking & Content Delivery",
  question: "What is networking in the AWS Cloud?",
  options: [
    "System that translates readable domain names to IP addresses",
    "Logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define",
    "Physically isolated data centers or set of data centers within an AWS Region",
    "Interconnected devices that can exchange data and resources"
  ],
  answer: "Interconnected devices that can exchange data and resources",
  explanation: "Networking in AWS refers to the communication and data exchange between interconnected systems, instances, and services."
},
{
  id: "Network_02",
  domain: "Networking & Content Delivery",
  question: "Which AWS service helps deliver content globally with low latency?",
  options: ["Amazon Route 53", "Amazon CloudFront", "AWS Direct Connect", "AWS Global Accelerator"],
  answer: "Amazon CloudFront",
  explanation: "CloudFront is a global content delivery network (CDN) that caches data at AWS edge locations to reduce latency for users."
},
{
  id: "Network_03",
  domain: "Networking & Content Delivery",
  question: "Which AWS service can be used to register and manage domain names?",
  options: ["Amazon CloudFront", "Amazon Route 53", "AWS Direct Connect", "AWS Global Accelerator"],
  answer: "Amazon Route 53",
  explanation: "Route 53 provides domain registration, DNS routing, and health checking for resources inside and outside AWS."
},
{
  id: "Network_04",
  domain: "Networking & Content Delivery",
  question: "A financial company needs to deliver media-rich training videos to consultants worldwide with minimal latency. Which AWS service should they use?",
  options: ["Amazon CloudFront", "Amazon Route 53", "AWS Direct Connect", "AWS Global Accelerator"],
  answer: "Amazon CloudFront",
  explanation: "Amazon CloudFront caches and distributes video and static content globally to ensure low latency and high performance."
},
{
  id: "Network_05",
  domain: "Networking & Content Delivery",
  question: "A media company wants a service to manage domain registrations and route internet traffic to resources both inside and outside AWS. Which AWS service fits this need?",
  options: ["AWS Global Accelerator", "Amazon CloudFront", "AWS Direct Connect", "Amazon Route 53"],
  answer: "Amazon Route 53",
  explanation: "Route 53 provides both DNS management and domain registration, allowing routing to on-premises or AWS resources."
},
{
  id: "Network_06",
  domain: "Networking & Content Delivery",
  question: "Which AWS service provides a dedicated network connection from an on-premises data center to AWS?",
  options: ["AWS VPN", "AWS PrivateLink", "AWS Direct Connect", "AWS Global Accelerator"],
  answer: "AWS Direct Connect",
  explanation: "Direct Connect establishes a private, dedicated connection between an on-premises network and AWS for consistent performance."
},
{
  id: "Network_07",
  domain: "Networking & Content Delivery",
  question: "Which AWS service enables remote employees to securely connect to AWS and on-premises networks?",
  options: ["AWS Client VPN", "AWS Site-to-Site VPN", "AWS PrivateLink", "AWS Direct Connect"],
  answer: "AWS Client VPN",
  explanation: "AWS Client VPN is a managed client-based VPN solution that allows secure access for users from any location."
},
{
  id: "Network_08",
  domain: "Networking & Content Delivery",
  question: "Which AWS feature allows creation of a private subnet to isolate resources from internet access?",
  options: ["Internet Gateway", "Private Subnet", "VPC Peering", "Route Table"],
  answer: "Private Subnet",
  explanation: "Private subnets in a VPC allow hosting of internal resources that are not directly accessible from the internet."
},
{
  id: "Network_09",
  domain: "Networking & Content Delivery",
  question: "A company wants broad control of traffic in and out of a subnet using both allow and deny rules. What should they use?",
  options: ["Security Groups", "Network ACLs", "Route Tables", "PrivateLink"],
  answer: "Network ACLs",
  explanation: "Network ACLs operate at the subnet level and support both allow and deny rules for controlling traffic."
},
{
  id: "Network_10",
  domain: "Networking & Content Delivery",
  question: "A healthcare company needs a private, dedicated connection to AWS for compliance reasons. Which AWS service should they use?",
  options: ["AWS Direct Connect", "AWS VPN", "AWS PrivateLink", "Amazon CloudFront"],
  answer: "AWS Direct Connect",
  explanation: "Direct Connect provides a secure and private connection, ideal for organizations with compliance and bandwidth requirements."
},
{
  id: "Network_11",
  domain: "Networking & Content Delivery",
  question: "A company wants to route user requests based on health checks and latency to improve application performance. Which service should they use?",
  options: ["AWS Direct Connect", "Amazon CloudFront", "AWS Global Accelerator", "Amazon Route 53"],
  answer: "AWS Global Accelerator",
  explanation: "Global Accelerator routes traffic to optimal endpoints using AWS’s global network, improving availability and latency."
},
{
  id: "Network_12",
  domain: "Networking & Content Delivery",
  question: "What is the primary function of a Domain Name System (DNS)?",
  options: [
    "Translates human-readable names into IP addresses",
    "Caches website content for faster delivery",
    "Encrypts internet connections",
    "Monitors application traffic"
  ],
  answer: "Translates human-readable names into IP addresses",
  explanation: "DNS converts friendly domain names (like example.com) into IP addresses so devices can connect over networks."
},
{
  id: "Network_13",
  domain: "Networking & Content Delivery",
  question: "Which AWS component provides secure connections between on-premises networks and AWS VPCs over the internet?",
  options: ["AWS Client VPN", "AWS Site-to-Site VPN", "AWS Direct Connect", "AWS Global Accelerator"],
  answer: "AWS Site-to-Site VPN",
  explanation: "Site-to-Site VPN establishes encrypted IPsec tunnels between customer sites and AWS over the internet."
},
{
  id: "Network_14",
  domain: "Networking & Content Delivery",
  question: "Which network component allows traffic control at the instance level within a VPC?",
  options: ["Network ACLs", "Security Groups", "Route Tables", "Private Subnets"],
  answer: "Security Groups",
  explanation: "Security groups act as virtual firewalls for EC2 instances, controlling inbound and outbound traffic."
},
{
  id: "Network_15",
  domain: "Networking & Content Delivery",
  question: "Which AWS feature allows control of inbound and outbound traffic at the subnet level?",
  options: ["Security Groups", "Network ACLs", "Route Tables", "VPC Peering"],
  answer: "Network ACLs",
  explanation: "Network ACLs operate at the subnet level, offering broader traffic control with both allow and deny rules."
},
{
  id: "Network_16",
  domain: "Networking & Content Delivery",
  question: "A customer needs a dedicated connection to AWS for high bandwidth workloads. Which service provides this?",
  options: ["AWS Direct Connect", "AWS VPN", "AWS PrivateLink", "AWS Global Accelerator"],
  answer: "AWS Direct Connect",
  explanation: "Direct Connect delivers private, high-bandwidth connections between on-premises environments and AWS."
},
{
  id: "Network_17",
  domain: "Networking & Content Delivery",
  question: "A company merged with another and wants to quickly provide secure remote access for global employees to AWS resources. Which solution fits best?",
  options: ["AWS Client VPN", "AWS Site-to-Site VPN", "AWS Direct Connect", "AWS PrivateLink"],
  answer: "AWS Client VPN",
  explanation: "Client VPN provides managed, secure access for remote employees using client software with authentication support."
},
{
  id: "Network_18",
  domain: "Networking & Content Delivery",
  question: "Which AWS component enables a secure private connection between an on-premises data center and a VPC?",
  options: ["Internet Gateway", "Virtual Private Gateway", "Subnet", "Route Table"],
  answer: "Virtual Private Gateway",
  explanation: "A Virtual Private Gateway is used to establish VPN connections between on-premises networks and a VPC."
},
{
  id: "Network_19",
  domain: "Networking & Content Delivery",
  question: "Which AWS service helps route traffic globally and improve performance by using static IP addresses and endpoint health?",
  options: ["AWS Global Accelerator", "Amazon Route 53", "Amazon CloudFront", "AWS Direct Connect"],
  answer: "AWS Global Accelerator",
  explanation: "Global Accelerator routes traffic through AWS’s global network to healthy endpoints for better performance and availability."
},


  // === Security & Compliance ===
  {
  id: "Security_01",
  domain: "Security & Compliance",
  question: "Which AWS service enables centralized identity management and access control across AWS accounts and services?",
  options: ["AWS IAM", "AWS Organizations", "AWS Control Tower", "AWS Cognito"],
  answer: "AWS IAM",
  explanation: "AWS Identity and Access Management (IAM) allows you to manage users, groups, and roles to securely control access to AWS resources."
},
{
  id: "Security_02",
  domain: "Security & Compliance",
  question: "Which AWS service enables multi-account governance, allowing consolidated billing and policy management?",
  options: ["AWS IAM", "AWS Organizations", "AWS Control Tower", "AWS CloudFormation"],
  answer: "AWS Organizations",
  explanation: "AWS Organizations lets you centrally manage multiple AWS accounts with consolidated billing and service control policies."
},
{
  id: "Security_03",
  domain: "Security & Compliance",
  question: "What is the main responsibility of the customer under the AWS shared responsibility model?",
  options: [
    "Securing the hardware and facilities that run AWS Cloud services",
    "Securing the software that runs AWS Cloud services",
    "Securing network traffic with subnets, security groups, and access controls",
    "Managing the physical security of AWS data centers"
  ],
  answer: "Securing network traffic with subnets, security groups, and access controls",
  explanation: "Customers are responsible for security 'in' the cloud, such as network configurations and access permissions."
},
{
  id: "Security_04",
  domain: "Security & Compliance",
  question: "Which AWS service provides DDoS protection for web applications?",
  options: ["AWS WAF", "AWS Shield", "Amazon Inspector", "AWS GuardDuty"],
  answer: "AWS Shield",
  explanation: "AWS Shield automatically protects applications running on AWS from DDoS attacks at no extra cost."
},
{
  id: "Security_05",
  domain: "Security & Compliance",
  question: "Which AWS service lets you define fine-grained rules to filter and block web requests based on IP addresses or query strings?",
  options: ["AWS GuardDuty", "AWS WAF", "AWS Shield", "AWS CloudTrail"],
  answer: "AWS WAF",
  explanation: "AWS Web Application Firewall (WAF) protects applications by filtering and monitoring HTTP/S requests."
},
{
  id: "Security_06",
  domain: "Security & Compliance",
  question: "Which AWS service continuously monitors for malicious activity and unauthorized behavior in your AWS environment?",
  options: ["Amazon Inspector", "AWS Config", "AWS GuardDuty", "AWS CloudTrail"],
  answer: "AWS GuardDuty",
  explanation: "GuardDuty uses machine learning and threat intelligence to detect suspicious activity and potential threats."
},
{
  id: "Security_07",
  domain: "Security & Compliance",
  question: "Which AWS service provides a record of all account activity, including API calls and user logins?",
  options: ["AWS CloudWatch", "AWS Config", "AWS CloudTrail", "AWS Inspector"],
  answer: "AWS CloudTrail",
  explanation: "CloudTrail tracks and logs AWS account activity, including API usage, for auditing and compliance purposes."
},
{
  id: "Security_08",
  domain: "Security & Compliance",
  question: "Which AWS service helps assess applications for vulnerabilities and deviations from security best practices?",
  options: ["AWS Shield", "AWS WAF", "Amazon Inspector", "AWS Config"],
  answer: "Amazon Inspector",
  explanation: "Amazon Inspector automatically scans workloads for vulnerabilities and generates detailed findings."
},
{
  id: "Security_09",
  domain: "Security & Compliance",
  question: "Which AWS service helps track configuration changes to AWS resources over time for compliance purposes?",
  options: ["AWS Config", "AWS CloudTrail", "AWS CloudWatch", "AWS Trusted Advisor"],
  answer: "AWS Config",
  explanation: "AWS Config records configuration changes and evaluates them against compliance rules and best practices."
},
{
  id: "Security_10",
  domain: "Security & Compliance",
  question: "Which AWS service provides real-time security recommendations for improving your AWS environment?",
  options: ["AWS Trusted Advisor", "AWS GuardDuty", "AWS Security Hub", "Amazon Inspector"],
  answer: "AWS Trusted Advisor",
  explanation: "Trusted Advisor offers real-time guidance to optimize performance, reduce costs, and improve security and fault tolerance."
},
{
  id: "Security_11",
  domain: "Security & Compliance",
  question: "You work for a startup company that is developing an application in the cloud. A new security update is available for your operating system (OS), and you are tasked with verifying that the OS is patched accordingly. Which statement BEST describes which party is responsible for applying security patches to the OS that is running in the cloud?",
  options: [
    "AWS is responsible for applying security patches to the OS.",
    "Your company is responsible applying security patches to the OS.",
    "Both AWS and the customer apply separate patches.",
    "The OS vendor applies the patches."
  ],
  answer: "Your company is responsible applying security patches to the OS.",
  explanation: "Under the shared responsibility model, AWS manages security *of* the cloud (infrastructure, hardware, etc.), while the customer manages security *in* the cloud — including OS updates, configurations, and patches."
},
{
  id: "Security_12",
  domain: "Security & Compliance",
  question: "A finance company is interested in migrating to the cloud. They are curious if they will have enough staff to secure both their office space and the physical infrastructure of their cloud computing resources. Which statement BEST describes the company's responsibility when it comes to securing physical infrastructure of the cloud?",
  options: [
    "AWS is responsible for securing the physical infrastructure, and the company can focus on securing their data and applications within the cloud.",
    "The company is fully responsible for securing all physical infrastructure of the cloud, including data centers.",
    "The company shares responsibility with the cloud provider for securing the physical infrastructure.",
    "The company does not have any responsibility when it comes to security in the cloud."
  ],
  answer: "AWS is responsible for securing the physical infrastructure, and the company can focus on securing their data and applications within the cloud.",
  explanation: "Under the shared responsibility model, AWS handles security *of* the cloud — including physical data centers, hardware, and global infrastructure — while customers are responsible for security *in* the cloud, such as data protection and configurations."
},
{
  id: "Security_13",
  domain: "Security & Compliance",
  question: "You are a cloud architect at a company that has recently migrated its infrastructure to AWS. Your manager has asked you to debrief your team on which responsibilities the customer has when it comes to securing cloud resources. What is the customer's responsibility, based on the AWS Shared Responsibility Model? (Select TWO.)",
  options: [
    "Updating compute, networking, storage, and database software",
    "Managing operating system (OS) patches",
    "Networking and infrastructure hardware maintenance",
    "Encrypting client-side data",
    "Physical security of data centers"
  ],
  answer: ["Managing operating system (OS) patches", "Encrypting client-side data"],
  explanation: "Under the AWS Shared Responsibility Model, customers are responsible for security *in* the cloud — including managing OS patches, application configurations, and encryption of client-side data. AWS is responsible for the underlying infrastructure and physical security."
},
{
  id: "Security_14",
  domain: "Security & Compliance",
  question: "What is the customer's responsibility when using compute services like Amazon EC2 according to the AWS shared responsibility model?",
  options: [
    "AWS manages the security of the cloud, and the customer manages the security of the infrastructure.",
    "The customer is responsible for securing the physical hardware of their EC2 instances.",
    "AWS is responsible for managing the operating system, networking, and applications on the customer's EC2 instances.",
    "The customer is responsible for configuring, securing, and managing the operating system, networking, and applications on their EC2 instances."
  ],
  answer: "The customer is responsible for configuring, securing, and managing the operating system, networking, and applications on their EC2 instances.",
  explanation: "Under the shared responsibility model, AWS secures the physical infrastructure and hypervisor, while customers are responsible for managing and securing their own operating systems, configurations, and applications within EC2."
},
// === Billing and Pricing ===
{
  id: "Billing_01",
  domain: "Billing & Pricing",
  question: "A financial services company needs to run sensitive applications that handle confidential customer data and require compliance with industry regulations. They need complete control over the physical server, including instance placement and resource allocation. Which pricing option should they choose?",
  options: [
    "Dedicated Hosts",
    "Savings Plans",
    "On Demand",
    "Spot Instances"
  ],
  answer: "Dedicated Hosts",
  explanation: "Dedicated Hosts provide a customer with full control over physical servers, allowing compliance with specific security and licensing requirements. This option is ideal for regulated industries needing hardware-level isolation and visibility."
},
{
  id: "Billing_02",
  domain: "Billing & Pricing",
  question: "A startup is running a batch processing workload that can tolerate occasional interruptions, and they want to reduce costs by taking advantage of unused Amazon EC2 capacity. Which pricing option would offer them the most savings?",
  options: [
    "Reserved Instances",
    "Savings Plans",
    "On Demand",
    "Spot Instances"
  ],
  answer: "Spot Instances",
  explanation: "Spot Instances let you use unused EC2 capacity at discounts of up to 90% compared to On-Demand pricing. They are ideal for fault-tolerant, flexible workloads such as batch processing or data analysis that can handle interruptions."
},
{
  id: "Billing_03",
  domain: "Billing & Pricing",
  question: "A customer is building a new application and is unsure of their usage patterns but expects to grow and stabilize usage over time. They want to start without a long-term commitment. Which pricing option should they use?",
  options: [
    "Reserved Instances",
    "Savings Plans",
    "On Demand",
    "Spot Instances"
  ],
  answer: "On Demand",
  explanation: "On-Demand pricing is ideal for new workloads with unpredictable usage. It allows you to pay only for the compute you use, without long-term commitments, providing flexibility as usage patterns stabilize."
}
];
