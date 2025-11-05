// =====================================================
// AWS CPC Quiz Trainer – Learning Modules (v7.0 Teal Glow Edition)
// Author: Geoffrey D. Metzger | Integrity Programming
// =====================================================
//
// ✨ Features
// - Modular AWS CPC lessons by domain
// - Inline domain filters + “Clear Filters” reset
// - Teal-glow progress bar per domain
// - Smooth transitions + scroll resets
// - Female voice reader (Aria / Jenny / Samantha)
// - Auto-Read toggle + manual Read/Stop
// - Drop-in replacement for /js/modules.js
// =====================================================

// =====================================================
// 🧠 Lesson Content (Modules 1–2 scaffolded)
// =====================================================
const awsModules = [
  // 🌩️ Module 1: Cloud Concepts
  {
    id: 1,
    domain: "Cloud Concepts",
    title: "What is Cloud Computing?",
    duration: "2m",
    text: `
      Cloud computing is the on-demand delivery of IT resources over the internet 
      with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical 
      data centers and servers, customers can access technology services such as 
      computing power, storage, and databases on an as-needed basis.
    `,
  },
  {
    id: 2,
    domain: "Cloud Concepts",
    title: "Benefits of Cloud Computing",
    duration: "3m",
    text: `
      The AWS Cloud provides several key advantages:<br><br>
      • Trade capital expense for variable expense<br>
      • Benefit from massive economies of scale<br>
      • Stop guessing capacity<br>
      • Increase speed and agility<br>
      • Go global in minutes
    `,
  },
  {
    id: 3,
    domain: "Security & Compliance",
    title: "Shared Responsibility Model",
    duration: "2m",
    text: `
      AWS manages security <em>of</em> the cloud (infrastructure, hardware, global network),
      while customers are responsible for security <em>in</em> the cloud 
      (data, applications, IAM configurations, encryption).
    `,
  },
  // =====================================================
// 🌩️ Module 1: Introduction to the Cloud
// =====================================================
{
  id: 101,
  domain: "Cloud Concepts",
  title: "Defining Cloud Computing",
  duration: "2m",
  text: `
    Cloud computing is the on-demand delivery of IT resources over the internet 
    with pay-as-you-go pricing. Instead of buying, owning, and maintaining servers 
    or data centers, customers access computing power, storage, and databases as needed.
  `,
},
{
  id: 102,
  domain: "Cloud Concepts",
  title: "The Shared Cloud Model",
  duration: "2m",
  text: `
    The cloud provides a shared pool of configurable resources—networks, servers, 
    storage, and applications—that can be provisioned and released rapidly 
    with minimal management effort.
  `,
},
{
  id: 103,
  domain: "Cloud Concepts",
  title: "Five Characteristics of Cloud Computing",
  duration: "3m",
  text: `
    Cloud computing is defined by five key characteristics:<br><br>
    1️⃣ On-demand self-service — provision resources automatically.<br>
    2️⃣ Broad network access — available anywhere with an internet connection.<br>
    3️⃣ Resource pooling — shared multi-tenant infrastructure.<br>
    4️⃣ Rapid elasticity — scale resources up or down instantly.<br>
    5️⃣ Measured service — pay only for what you use.
  `,
},
{
  id: 104,
  domain: "Cloud Concepts",
  title: "Cloud Deployment Models",
  duration: "3m",
  text: `
    AWS supports multiple deployment models:<br><br>
    • <b>Public Cloud</b> – fully hosted by AWS and shared across customers.<br>
    • <b>Private Cloud</b> – dedicated resources for one organization.<br>
    • <b>Hybrid Cloud</b> – combines on-premises and cloud infrastructure for flexibility.
  `,
},
{
  id: 105,
  domain: "Cloud Concepts",
  title: "Cloud Service Models",
  duration: "3m",
  text: `
    There are three major cloud service models:<br><br>
    • <b>IaaS</b> – Infrastructure as a Service (EC2, S3).<br>
    • <b>PaaS</b> – Platform as a Service (Elastic Beanstalk).<br>
    • <b>SaaS</b> – Software as a Service (Amazon WorkMail, Salesforce).<br><br>
    These models build on one another—from raw infrastructure to fully managed applications.
  `,
},
{
  id: 106,
  domain: "Cloud Concepts",
  title: "Cloud Deployment Overview",
  duration: "2m",
  text: `
    You can deploy cloud resources in multiple ways: cloud-only, on-premises, or hybrid.  
    Each model offers unique benefits and considerations.  
    Choosing the right mix helps organizations design an effective, scalable strategy.
  `,
},
{
  id: 107,
  domain: "Cloud Concepts",
  title: "Cloud-Based Deployment",
  duration: "2m",
  text: `
    In a cloud-based deployment, applications are built and run entirely on the cloud.  
    For example, a company might migrate its databases to AWS and host its virtual servers 
    and storage entirely in the AWS environment.
  `,
},
{
  id: 108,
  domain: "Cloud Concepts",
  title: "On-Premises Deployment",
  duration: "2m",
  text: `
    On-premises deployments use local infrastructure and management tools.  
    They can provide lower latency and strict control but lack many cloud benefits 
    such as elasticity and reduced maintenance overhead.
  `,
},
{
  id: 109,
  domain: "Cloud Concepts",
  title: "Hybrid Deployment",
  duration: "3m",
  text: `
    Hybrid deployments connect on-premises infrastructure to cloud resources.  
    They’re useful for organizations with regulatory or legacy constraints.  
    Example: keep sensitive workloads local while using AWS for analytics and backups.
  `,
},
{
  id: 110,
  domain: "Cloud Concepts",
  title: "Key Benefits of the AWS Cloud",
  duration: "3m",
  text: `
    AWS provides six major advantages over traditional infrastructure:<br><br>
    1️⃣ Trade fixed expense for variable expense.<br>
    2️⃣ Benefit from massive economies of scale.<br>
    3️⃣ Stop guessing capacity.<br>
    4️⃣ Increase speed and agility.<br>
    5️⃣ Eliminate data-center maintenance.<br>
    6️⃣ Go global in minutes.
  `,
},

  // =====================================================
// 💰 Module 2: Cloud Economics & Billing
// =====================================================
{
  id: 201,
  domain: "Billing & Pricing",
  title: "Introduction to AWS Pricing",
  duration: "2m",
  text: `
    AWS pricing is based on a simple principle: <b>pay only for what you use.</b><br><br>
    There are no long-term contracts or complex licensing requirements.  
    You pay for the compute, storage, and other resources you actually consume.  
    This approach allows organizations to start small and scale efficiently as demand grows.
  `,
},
{
  id: 202,
  domain: "Billing & Pricing",
  title: "The AWS Free Tier",
  duration: "2m",
  text: `
    The <b>AWS Free Tier</b> is designed to help new users get hands-on experience.  
    It offers limited usage of select AWS services for free, such as:<br><br>
    • 750 hours per month of Amazon EC2 (t2.micro or t3.micro)<br>
    • 5 GB of Amazon S3 storage<br>
    • 750 hours per month of Amazon RDS micro instance<br><br>
    The Free Tier helps users explore AWS products safely without unexpected costs.
  `,
},
{
  id: 203,
  domain: "Billing & Pricing",
  title: "AWS Pricing Models",
  duration: "3m",
  text: `
    AWS services follow three main pricing models:<br><br>
    • <b>On-Demand</b> – pay for compute or storage as you go, no commitments.<br>
    • <b>Reserved</b> – commit to 1 or 3 years for discounted rates (up to 75% off).<br>
    • <b>Spot</b> – purchase unused capacity at deep discounts, ideal for flexible workloads.<br><br>
    Selecting the right model balances cost with flexibility and usage predictability.
  `,
},
{
  id: 204,
  domain: "Billing & Pricing",
  title: "AWS Organizations and Consolidated Billing",
  duration: "3m",
  text: `
    <b>AWS Organizations</b> allows you to group and manage multiple AWS accounts centrally.  
    With <b>Consolidated Billing</b>, all linked accounts share a single bill while maintaining 
    separate usage tracking. This provides:<br><br>
    • Centralized cost management<br>
    • Volume discounts across accounts<br>
    • Easier governance and permissions control
  `,
},
{
  id: 205,
  domain: "Billing & Pricing",
  title: "AWS Pricing Calculator",
  duration: "2m",
  text: `
    The <b>AWS Pricing Calculator</b> is a free tool that helps you estimate monthly costs.  
    You can select services, input expected usage, and generate detailed cost breakdowns.  
    This tool is especially useful for forecasting expenses before deploying solutions.
  `,
},
{
  id: 206,
  domain: "Billing & Pricing",
  title: "AWS Cost Explorer and Budgets",
  duration: "3m",
  text: `
    <b>Cost Explorer</b> helps visualize and analyze AWS spending over time.  
    You can identify trends, track usage patterns, and locate cost drivers.<br><br>
    <b>AWS Budgets</b> allows you to set custom cost or usage limits.  
    When spending exceeds thresholds, alerts notify you via email or SNS.  
    Together, they form a powerful cost control toolkit for any organization.
  `,
},
{
  id: 207,
  domain: "Billing & Pricing",
  title: "Total Cost of Ownership (TCO)",
  duration: "3m",
  text: `
    <b>Total Cost of Ownership (TCO)</b> compares the cost of running workloads on-premises 
    versus in the AWS Cloud. AWS TCO calculators include hardware, power, cooling, 
    maintenance, and staff costs. In most cases, AWS reduces long-term expenses 
    by removing the need for physical infrastructure and routine upgrades.
  `,
},
{
  id: 208,
  domain: "Billing & Pricing",
  title: "Economies of Scale in AWS",
  duration: "2m",
  text: `
    As AWS usage grows globally, it achieves <b>massive economies of scale</b>.  
    AWS can purchase hardware, bandwidth, and energy at large discounts — and 
    pass those savings on to customers. This is one reason why AWS costs 
    have steadily decreased over time.
  `,
},
{
  id: 209,
  domain: "Billing & Pricing",
  title: "AWS Support Plans Overview",
  duration: "2m",
  text: `
    AWS offers four support plan tiers:<br><br>
    • <b>Basic</b> – included with all accounts, 24/7 customer service and docs.<br>
    • <b>Developer</b> – best for testing environments, email support during business hours.<br>
    • <b>Business</b> – 24/7 phone/chat support and guidance from Cloud Support Engineers.<br>
    • <b>Enterprise</b> – dedicated Technical Account Manager (TAM) and concierge service.<br><br>
    The higher tiers offer faster response times and proactive support.
  `,
},
{
  id: 210,
  domain: "Billing & Pricing",
  title: "Key Takeaways: Cloud Economics",
  duration: "2m",
  text: `
    Cloud economics emphasizes <b>operational efficiency</b> and <b>financial flexibility</b>.  
    By understanding AWS pricing, organizations can optimize cost performance while 
    maintaining agility. The goal is simple — <em>pay less, innovate faster, and scale smarter.</em>
  `,
},

  // =====================================================
// 💰 Module 3: Cloud Economics & Billing
// =====================================================
{
  id: 301,
  domain: "Compute",
  title: "Unmanaged vs Managed Compute Services",
  duration: "3m",
  text: `
    AWS offers both unmanaged and managed compute services to match your desired level 
    of control and responsibility.<br><br>

    With <b>unmanaged services</b> like Amazon EC2, AWS handles the physical hardware, 
    but you are responsible for configuring, securing, and maintaining the operating system, 
    networking, and applications that run on it.<br><br>

    <b>Managed services</b> reduce your operational burden. AWS takes care of provisioning, 
    patching, and much of the infrastructure management, while you focus on your workloads 
    and configurations.<br><br>

    <b>Fully-managed services</b>—such as serverless offerings—go a step further. 
    You do not provision or manage servers at all. AWS manages the infrastructure, scaling, 
    and availability so that you can concentrate solely on writing and deploying code.<br><br>

    <b>Example:</b> AWS Lambda is a serverless compute service. 
    AWS handles the servers and scaling; you manage only your application code 
    and its permissions.
  `
},
{
  id: 302,
  domain: "Compute",
  title: "AWS Lambda — Serverless Compute",
  duration: "5m",
  text: `
    <b>Overview:</b><br>
    AWS Lambda is a <b>serverless compute service</b> that runs your code in response 
    to events—without provisioning or managing any servers. It automatically scales 
    based on incoming requests, and you are charged only for the compute time used, 
    down to the millisecond.<br><br>

    <b>How It Works:</b><br>
    1️⃣ <b>Upload code to Lambda</b> — Your code is deployed as a Lambda function.<br>
    2️⃣ <b>Set triggers</b> — Configure your function to be triggered by events, 
    such as AWS services, mobile app actions, or HTTP requests.<br>
    3️⃣ <b>Run when triggered</b> — The code executes only when an event occurs, 
    like a file upload or API call. AWS automatically handles infrastructure, scaling, 
    and execution.<br>
    4️⃣ <b>Pay only for usage</b> — You are billed only for compute time, 
    based on the memory allocated and execution duration.<br><br>

    <b>Performance Optimization:</b><br>
    Lambda lets you tune performance by adjusting your function’s memory allocation, 
    which proportionally affects CPU and network throughput.<br><br>

    <b>Common Use Cases:</b><br>
    🖼️ <b>Real-time Image Processing</b> — A social media app triggers a Lambda 
    function whenever a user uploads a photo. Lambda resizes, filters, and stores 
    the optimized image automatically—scaling for high upload volume without 
    manual infrastructure.<br><br>

    📰 <b>Personalized Content Delivery</b> — A news aggregator triggers Lambda 
    to fetch articles from multiple sources and personalize results based on user 
    preferences. Code runs only when users interact, reducing cost and improving 
    scalability.<br><br>

    🎮 <b>Real-time Game Event Handling</b> — A gaming platform uses Lambda to 
    process thousands of player actions per second, update leaderboards, and 
    handle achievements. Lambda’s event-driven architecture ensures consistent 
    performance during peak play times.<br><br>

    <b>Key Benefit:</b>  
    Focus on writing and deploying your code while AWS handles all 
    infrastructure, scaling, and fault tolerance. This makes Lambda an essential 
    building block for modern, event-driven applications.
  `
},
{
  id: 303,
  domain: "Compute",
  title: "AWS Container Services — ECS, EKS, ECR, and Fargate",
  duration: "6m",
  text: `
    <b>Overview:</b><br>
    AWS provides a complete set of container management tools that fall into 
    three categories: <b>orchestration</b>, <b>registry</b>, and <b>compute</b>. 
    These services help developers build, deploy, and scale containerized 
    applications efficiently on the AWS Cloud.<br><br>

    <b>Amazon Elastic Container Service (ECS)</b><br>
    Amazon ECS is a scalable <b>container orchestration service</b> for running 
    and managing Docker containers on AWS. It lets you define tasks, services, 
    and clusters to handle deployments automatically.<br><br>

    <b>ECS Launch Types:</b><br>
    • <b>ECS + Amazon EC2</b> — Ideal for teams that need <b>full control</b> 
      over infrastructure. Perfect for custom workloads requiring specific 
      hardware or networking configurations.<br>
    • <b>ECS + AWS Fargate</b> — A <b>serverless option</b> with no servers to 
      manage. Great for startups or small teams with variable traffic. AWS 
      automatically handles scaling and orchestration.<br><br>

    <b>Amazon Elastic Kubernetes Service (EKS)</b><br>
    Amazon EKS is a fully managed service for running <b>Kubernetes</b> on AWS. 
    It simplifies deployment, management, and scaling of containerized apps 
    using the open-source Kubernetes ecosystem.<br><br>

    <b>EKS Launch Types:</b><br>
    • <b>EKS + Amazon EC2</b> — Best for enterprises that need deep control of 
      infrastructure and complex, large-scale workloads.<br>
    • <b>EKS + AWS Fargate</b> — Combines the flexibility of Kubernetes with 
      <b>serverless simplicity</b>, removing server management while retaining 
      Kubernetes’ scalability.<br><br>

    <b>Amazon Elastic Container Registry (ECR)</b><br>
    Amazon ECR is a fully managed <b>container image registry</b>. It stores, 
    manages, and deploys container images that follow 
    <b>Open Container Initiative (OCI)</b> standards.  
    You can push, pull, and manage images using familiar CLI tools and CI/CD 
    pipelines.<br><br>

    <b>AWS Fargate</b><br>
    AWS Fargate is a <b>serverless compute engine for containers</b> that works 
    with both ECS and EKS. Unlike ECS or EKS—which orchestrate containers—
    Fargate focuses on <b>hosting and running</b> them without any server 
    provisioning. AWS handles all infrastructure management, so you can focus 
    on innovation.<br><br>

    <b>Key Benefit:</b>  
    Fargate charges only for the resources your containers actually use, giving 
    you efficient cost control while ensuring reliable scalability for your 
    containerized workloads.
  `
},
{
  id: 304,
  domain: "Compute",
  title: "Additional Compute Services — Beanstalk, Batch, Lightsail, and Outposts",
  duration: "5m",
  text: `
    <b>Overview:</b><br>
    AWS provides a variety of <b>purpose-built compute services</b> to meet 
    specific needs—from simplifying web app deployment to handling batch workloads 
    or extending the cloud to on-premises environments.<br><br>

    <b>Elastic Beanstalk</b><br>
    Elastic Beanstalk is a <b>fully managed service</b> that streamlines the 
    deployment, management, and scaling of web applications.  
    Developers simply upload their code, and Elastic Beanstalk automatically 
    handles provisioning, scaling, load balancing, and health monitoring.  
    It supports multiple programming languages and frameworks including 
    <b>Java, .NET, Python, Node.js, and Docker</b>.<br><br>
    <b>Good for:</b> Deploying and managing <b>web apps, RESTful APIs, 
    mobile backends, and microservices architectures</b> with minimal 
    infrastructure management.<br><br>

    <b>AWS Batch</b><br>
    AWS Batch is a <b>fully managed service</b> for running batch computing 
    workloads at any scale. It automatically provisions and optimizes compute 
    resources based on the volume and requirements of submitted jobs.  
    <b>Good for:</b> Processing large-scale, parallel workloads such as 
    <b>scientific research, financial analysis, big data processing, 
    media rendering, and machine learning training</b>.<br><br>

    <b>Amazon Lightsail</b><br>
    Lightsail provides <b>virtual private servers (VPS)</b> with storage, 
    databases, and networking at a predictable monthly price.  
    It offers an easy entry point into AWS, making cloud hosting accessible 
    to small businesses and individual developers.  
    <b>Good for:</b> <b>Small websites, testing environments, blogs, 
    and learning cloud fundamentals</b> without needing advanced AWS setup.<br><br>

    <b>AWS Outposts</b><br>
    AWS Outposts is a <b>fully managed hybrid cloud service</b> that extends AWS 
    infrastructure, services, and APIs to on-premises environments.  
    It provides consistent operations between local data centers and the cloud.  
    <b>Good for:</b> <b>Low-latency applications, edge computing, 
    regulatory compliance, and legacy modernization</b> where workloads 
    must remain physically near users or data sources.<br><br>

    <b>Key Benefit:</b>  
    These services help organizations choose the right compute model—whether 
    they need simplicity, scalability, predictable pricing, or hybrid flexibility—
    all while maintaining integration with the broader AWS ecosystem.
  `
},

// =====================================================
// 🌍 AWS Cloud Practitioner Essentials – Module 4 Lessons
// Topic: Going Global with AWS Infrastructure
// =====================================================

{
    id: 401,
    domain: "Cloud Concepts",
    title: "Going Global with AWS Infrastructure",
    duration: "2m",
    text: `
      AWS provides a global network of data centers designed to deliver secure,
      low-latency access to cloud resources for customers around the world.
      This infrastructure allows businesses to deploy applications closer to users,
      improve performance, and meet data residency requirements.
    `
  },
  {
    id: 402,
    domain: "Cloud Concepts",
    title: "Choosing an AWS Region",
    duration: "3m",
    text: `
      Choosing the right AWS Region is similar to choosing where to open a new coffee shop.
      You must balance factors such as:
      • Customer proximity and latency needs
      • Compliance and data residency requirements
      • Available services and features
      • Cost differences between Regions
      Some businesses operate in multiple Regions to improve redundancy and global reach.
    `
  },
  {
    id: 403,
    domain: "Cloud Concepts",
    title: "AWS Edge Locations",
    duration: "2m",
    text: `
      Edge locations act like mobile coffee carts that bring services closer to customers.
      These are smaller AWS data centers that cache frequently accessed content, 
      such as images, videos, and API responses. 
      Edge locations support services like Amazon CloudFront and AWS Global Accelerator, 
      helping reduce latency and improve user experience by delivering data faster.
    `
  },
  {
    id: 404,
    domain: "Cloud Concepts",
    title: "Infrastructure as Code and AWS CloudFormation",
    duration: "3m",
    text: `
      To keep every coffee shop consistent, you’d use a repeatable process for setup.
      In AWS, this is achieved using Infrastructure as Code (IaC) through services like AWS CloudFormation.
      CloudFormation allows you to define your infrastructure in code templates 
      that automate deployment, configuration, and updates.
      Benefits include:
      • Consistent resource provisioning
      • Reduced human error
      • Simplified scaling and replication across multiple Regions
    `
  },
  {
    id: 405,
    domain: "Cloud Concepts",
    title: "Global Expansion and Consistency",
    duration: "2m",
    text: `
      AWS’s global infrastructure enables businesses to operate seamlessly across continents.
      Regions, Availability Zones, and Edge Locations work together to ensure low latency, high availability, and resiliency.
      Combined with IaC tools like CloudFormation, you can deploy reliable, consistent applications
      no matter where your customers are located.
    `
  },
  {
    id: 406,
  domain: "Cloud Concepts",
  title: "Key Considerations When Choosing AWS Regions",
  duration: "3m",
  text: `
    When selecting AWS Regions to deploy your workloads, several key factors influence
    performance, compliance, and cost. Choosing the right Region helps you balance legal,
    technical, and business requirements.

    1. Compliance:
    Each Region is subject to the regulations of its geographical location. For instance,
    organizations operating in the European Union (EU) must comply with GDPR, which requires
    consent-based data collection and the ability for users to access or delete their data.
    Selecting a Region that aligns with your compliance needs helps ensure lawful data handling.

    2. Proximity:
    Regions closer to your users provide lower latency and faster response times.
    Deploying workloads near your customer base minimizes data travel distance, improving
    user experience and system efficiency.

    3. Feature Availability:
    Not all AWS services are available in every Region. Some specialized Regions, such as
    AWS GovCloud (US), are designed to meet strict government and security requirements.
    Always check the AWS Regional Services List before deploying workloads that require
    specific features.

    4. Pricing:
    Regional cost differences can impact your budget. Operational expenses, tax laws,
    and data sovereignty rules vary by location. Some Regions offer lower hosting and
    storage costs or tax incentives, while others might require local data residency
    that influences pricing.
  `
},
{
  id: 407,
  domain: "Cloud Concepts",
  title: "Designing Highly Available Architectures",
  duration: "4m",
  text: `
    AWS enables organizations to design architectures that maintain continuous operations
    even when individual components fail. By deploying your workloads across multiple
    Availability Zones (AZs) and Regions, you can achieve high availability, agility,
    and elasticity in your infrastructure.

    Deploying Multi-Region and Multi-AZ Resources:
    High availability is achieved by replicating or distributing your workloads across multiple
    levels of AWS infrastructure. Using multiple AZs or Regions ensures that if one component
    fails, others can continue operating. This redundancy reduces downtime and maintains user access.

    Key Concepts:
    • High Availability – The ability of a system to operate continuously with minimal downtime.
      AWS resources in multiple AZs can withstand component failures while maintaining service uptime.

    • Agility – The capability to quickly adapt to new requirements or market conditions.
      AWS makes it easy to deploy, test, and update applications rapidly through automation.

    • Elasticity – The ability to automatically scale resources up or down based on real-time demand.
      This ensures you only pay for what you use while maintaining optimal performance.

    By combining these three advantages, AWS allows you to build systems that are not only reliable
    but also responsive to change and cost-efficient.
  `
},
{
  id: 408,
  domain: "Cloud Concepts",
  title: "AWS Edge Locations",
  duration: "3m",
  text: `
    Beyond Regions and Availability Zones, AWS operates a global edge network designed to bring
    services closer to end users. Edge locations provide faster data delivery and lower latency
    by caching and distributing content through services like Amazon CloudFront.

    These strategically placed facilities — located in cities such as Atlanta, Georgia (USA)
    and Shanghai, China — help deliver AWS services and application content efficiently across
    the world.

    AWS Edge Locations:
    • Cache data and static content (images, videos, files) closer to users.
    • Reduce latency and improve user experience through Amazon CloudFront, AWS's Content Delivery Network (CDN).
    • Provide low-latency access to applications for users outside of AWS Regions.
  `
},
{
  id: 409,
  domain: "Cloud Concepts",
  title: "Key Elements of AWS Global Infrastructure",
  duration: "3m",
  text: `
    AWS Global Infrastructure is built around three main components designed to ensure scalability,
    reliability, and performance across the world.

    1. AWS Regions:
       Geographical areas that host multiple data centers and Availability Zones.
       Each Region provides isolated, fault-tolerant environments for deploying cloud services.
       Most Regions contain at least three Availability Zones.

    2. Availability Zones (AZs):
       Distinct physical locations within a Region, each with independent power, cooling,
       and networking. AZs ensure high availability and fault tolerance by isolating workloads
       from failures in other zones.

    3. Edge Locations:
       Smaller, globally distributed data centers that cache and deliver content closer to users.
       Edge locations power services like Amazon CloudFront, ensuring fast, low-latency delivery
       of web content, applications, and streaming media.
  `
},
{
  id: 410,
  domain: "Cloud Concepts",
  title: "AWS CloudFormation: Infrastructure as Code",
  duration: "3m",
  text: `
    AWS CloudFormation allows you to define and provision your AWS infrastructure using code.
    Instead of manually setting up resources in the AWS Management Console, you can create a
    CloudFormation template that describes the desired configuration for your environment.

    Once defined, CloudFormation automatically provisions, configures, and maintains those
    resources for you — ensuring consistency across deployments and reducing manual effort.

    Example Use Case:
    • You can create a template that specifies an Amazon EC2 instance, a security group,
      and an S3 bucket. When the template is deployed, CloudFormation automatically builds
      the entire environment according to your configuration.

    Benefits:
    • Consistency – Repeatable infrastructure deployments reduce human error.
    • Automation – Infrastructure is created and updated automatically.
    • Version Control – Templates can be stored, tracked, and versioned in repositories.
    • Efficiency – Spend less time managing servers and more time building applications.

    CloudFormation is the foundation of Infrastructure as Code (IaC) in AWS — enabling scalable,
    reliable, and automated infrastructure management.
  `
},
{
  id: 411,
  domain: "Cloud Concepts",
  title: "Interacting with AWS Resources",
  duration: "2m",
  text: `
    To operate in the AWS Cloud, you interact with AWS services through Application Programming
    Interfaces (APIs). These APIs allow you to create, modify, and manage AWS resources using
    multiple tools, depending on your preferred workflow.

    Common Methods to Interact with AWS:
    • AWS Management Console – A web-based graphical interface ideal for visual management
      of AWS services and configurations.

    • AWS Command Line Interface (CLI) – A unified tool for managing AWS services using
      terminal commands and scripts.

    • AWS Software Development Kits (SDKs) – Programming libraries for languages like
      Python (boto3), JavaScript, and C# that allow developers to integrate AWS operations
      directly into applications.

    • Infrastructure as Code (IaC) Tools – Services such as AWS CloudFormation or AWS CDK
      (Cloud Development Kit) allow developers to define and manage infrastructure programmatically.

    These interfaces all communicate with AWS APIs, allowing flexibility in how you automate,
    scale, and manage your cloud resources efficiently.
  `
}



];

// =====================================================
// 🌐 Global State
// =====================================================
let currentModule = 0;
let filteredModules = [...awsModules];
let autoReadEnabled = false;
let preferredVoice = null;
let isSpeaking = false;

// =====================================================
// 📘 Display Logic
// =====================================================
function showModule(index) {
  if (index < 0 || index >= filteredModules.length) return;

  const module = filteredModules[index];
  const contentDiv = document.getElementById("module-content");

  contentDiv.innerHTML = `
    <h3>${module.title}</h3>
    <p><strong>Domain:</strong> ${module.domain}</p>
    <p>${module.text}</p>
    <p><em>Duration: ${module.duration}</em></p>
    <p class="mt-2"><small>Lesson ${index + 1} of ${filteredModules.length}</small></p>
  `;

  updateProgressBar(index);
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (autoReadEnabled) readCurrentModule();
}

// =====================================================
// 🧭 Progress Bar (Per Domain Reset)
// =====================================================
const progressBar = document.createElement("div");
progressBar.id = "lesson-progress-bar";
progressBar.style.height = "8px";
progressBar.style.background = "rgba(255,255,255,0.1)";
progressBar.style.borderRadius = "4px";
progressBar.style.overflow = "hidden";
progressBar.style.marginTop = "12px";

const progressFill = document.createElement("div");
progressFill.id = "lesson-progress-fill";
progressFill.style.height = "100%";
progressFill.style.width = "0%";
progressFill.style.background = "#00ffcc";
progressFill.style.boxShadow = "0 0 8px #00ffcc";
progressFill.style.transition = "width 0.3s ease";

progressBar.appendChild(progressFill);
document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("modules-screen");
  screen.insertBefore(progressBar, screen.children[1]);
});

function updateProgressBar(index) {
  const percent = ((index + 1) / filteredModules.length) * 100;
  progressFill.style.width = `${percent}%`;
}

// =====================================================
// 🧩 Domain Filter Logic
// =====================================================
function applyDomainFilter() {
  const checked = Array.from(document.querySelectorAll(".domain-check:checked")).map(cb => cb.value);
  filteredModules = checked.length
    ? awsModules.filter(m => checked.includes(m.domain))
    : [...awsModules];

  currentModule = 0;
  showModule(currentModule);
  updateHeader();

  // Reset progress on filter change
  progressFill.style.width = "0%";
}

// Header dynamically reflects selected domains
function updateHeader() {
  const checked = Array.from(document.querySelectorAll(".domain-check:checked")).map(cb => cb.value);
  const title = document.querySelector("#modules-screen h1");
  title.textContent = checked.length
    ? `📘 Studying: ${checked.join(" + ")}`
    : "📘 AWS Bite-Size Learning";
}

// =====================================================
// 🧹 Clear Filters Button
// =====================================================
const clearBtn = document.getElementById("clear-filters-btn");
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    document.querySelectorAll(".domain-check").forEach(cb => (cb.checked = false));
    filteredModules = [...awsModules];
    currentModule = 0;
    showModule(currentModule);
    updateHeader();
    progressFill.style.width = "0%";

    // Teal flash feedback
    clearBtn.style.backgroundColor = "#00ffcc";
    clearBtn.style.color = "#000";
    clearBtn.textContent = "✅ Filters Cleared!";
    setTimeout(() => {
      clearBtn.style.backgroundColor = "";
      clearBtn.style.color = "";
      clearBtn.textContent = "🧹 Clear Filters";
    }, 1000);
  });
}

// =====================================================
// 🗣️ Voice Logic (Female Voice Preference)
// =====================================================
function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return;
  }
  const femaleCandidates = voices.filter(v =>
    /female|Google US English|Microsoft Aria|Jenny|Samantha|en-US/i.test(v.name)
  );
  preferredVoice = femaleCandidates[0] || voices.find(v => /en/i.test(v.lang)) || voices[0];
  console.log("🎤 Selected voice:", preferredVoice ? preferredVoice.name : "default");
}
loadVoices();

function readCurrentModule() {
  const module = filteredModules[currentModule];
  if (!module || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const textToSpeak = `${module.title}. ${module.text.replace(/(<([^>]+)>)/gi, "")}`;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = preferredVoice?.lang || "en-US";
  utterance.rate = 1.0;
  utterance.pitch = 1.05;
  if (preferredVoice) utterance.voice = preferredVoice;

  window.speechSynthesis.speak(utterance);
  isSpeaking = true;
}

function stopReading() {
  window.speechSynthesis.cancel();
  isSpeaking = false;
}

// =====================================================
// ⏩ Navigation Controls
// =====================================================
document.getElementById("next-module").addEventListener("click", () => {
  if (currentModule < filteredModules.length - 1) {
    currentModule++;
    showModule(currentModule);
  }
});

document.getElementById("prev-module").addEventListener("click", () => {
  if (currentModule > 0) {
    currentModule--;
    showModule(currentModule);
  }
});

// =====================================================
// 🎧 Read & Auto-Read Controls
// =====================================================
document.getElementById("read-btn").addEventListener("click", readCurrentModule);
document.getElementById("stop-btn").addEventListener("click", stopReading);

const autoBtn = document.createElement("button");
autoBtn.id = "auto-toggle";
autoBtn.className = "warning-btn";
autoBtn.style.marginTop = "1rem";
autoBtn.textContent = "🗣️ Auto-Read: OFF";

autoBtn.addEventListener("click", () => {
  autoReadEnabled = !autoReadEnabled;
  autoBtn.textContent = autoReadEnabled ? "🟢 Auto-Read: ON" : "🗣️ Auto-Read: OFF";
  if (autoReadEnabled) readCurrentModule();
});

// =====================================================
// 🚀 Initialize
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modules-screen").appendChild(autoBtn);
  document.querySelectorAll(".domain-check").forEach(cb =>
    cb.addEventListener("change", applyDomainFilter)
  );
  showModule(currentModule);
  updateHeader();
});
