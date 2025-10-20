const questions = [
 // === Cloud Concepts ===
  {
    id: 1,
    domain: "Cloud Concepts",
    question: "Which factors are MOST important to consider when selecting an AWS Region? (Select TWO.)",
    options: [
      "Any regulatory compliance standards the agency requires",
      "Proximity to users",
      "Number of files stored",
      "Personal preference of the CIO",
      "How recently the Region was constructed"
    ],
    answer: "Any regulatory compliance standards the agency requires; Proximity to users",
    explanation: "When selecting a Region, consider compliance requirements and proximity to users to meet regulations and minimize latency."
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
  // === Technology ===
  {
    id: 11,
    domain: "Technology",
    question: "Which AWS service provides virtual servers in the cloud?",
    options: ["Amazon EC2", "AWS Lambda", "Amazon S3", "AWS Elastic Beanstalk"],
    answer: "Amazon EC2",
    explanation: "Amazon EC2 offers resizable compute capacity—virtual machines that you can configure and scale for various workloads."
  },
  {
    id: 12,
    domain: "Technology",
    question: "Which AWS service automatically provisions and scales web applications without requiring you to manage infrastructure?",
    options: ["AWS Elastic Beanstalk", "AWS CloudFormation", "AWS OpsWorks", "AWS Lambda"],
    answer: "AWS Elastic Beanstalk",
    explanation: "Elastic Beanstalk handles deployment, load balancing, and scaling so developers can focus on code rather than servers."
  },
  {
    id: 13,
    domain: "Technology",
    question: "Which compute service lets you run code without provisioning or managing servers?",
    options: ["Amazon EC2", "AWS Fargate", "AWS Lambda", "Amazon Lightsail"],
    answer: "AWS Lambda",
    explanation: "Lambda executes code in response to events and automatically manages compute resources, enabling serverless computing."
  },
  {
    id: 14,
    domain: "Technology",
    question: "Which AWS service provides managed containers that can run Docker applications?",
    options: ["Amazon ECS", "AWS Batch", "Amazon EC2", "AWS Elastic Beanstalk"],
    answer: "Amazon ECS",
    explanation: "Amazon ECS is a fully managed container orchestration service that runs and scales Docker containers."
  },
  {
    id: 15,
    domain: "Technology",
    question: "Which AWS service allows you to deploy and manage virtual private servers easily with preconfigured options?",
    options: ["Amazon Lightsail", "AWS Batch", "Amazon EC2", "AWS Elastic Beanstalk"],
    answer: "Amazon Lightsail",
    explanation: "Amazon Lightsail provides simplified virtual servers with predictable pricing—ideal for smaller projects or quick setups."
  },
  {
    id: 16,
    domain: "Technology",
    question: "Which AWS database service is a managed NoSQL database that delivers single-digit millisecond performance?",
    options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon Aurora"],
    answer: "Amazon DynamoDB",
    explanation: "DynamoDB is a fully managed NoSQL database service providing fast, consistent performance and seamless scalability."
  },
  {
    id: 17,
    domain: "Technology",
    question: "Which AWS service provides fully managed relational databases?",
    options: ["Amazon RDS", "Amazon DynamoDB", "Amazon Redshift", "Amazon ElastiCache"],
    answer: "Amazon RDS",
    explanation: "Amazon RDS simplifies setup, operation, and scaling of relational databases like MySQL, PostgreSQL, and SQL Server."
  },
  {
    id: 18,
    domain: "Technology",
    question: "Which AWS service helps developers monitor applications and infrastructure performance using metrics and alarms?",
    options: ["AWS CloudTrail", "Amazon CloudWatch", "AWS Config", "AWS Trusted Advisor"],
    answer: "Amazon CloudWatch",
    explanation: "CloudWatch collects metrics and logs, and enables alarms for operational visibility and automated responses."
  },
  {
    id: 19,
    domain: "Technology",
    question: "Which AWS service automates infrastructure deployment using reusable templates?",
    options: ["AWS OpsWorks", "AWS CloudFormation", "AWS Elastic Beanstalk", "AWS Systems Manager"],
    answer: "AWS CloudFormation",
    explanation: "CloudFormation defines infrastructure as code to provision AWS resources consistently and repeatedly."
  },
  {
    id: 20,
    domain: "Technology",
    question: "Which AWS service can be used for running batch computing workloads at scale?",
    options: ["AWS Batch", "AWS Lambda", "AWS Fargate", "AWS CloudFormation"],
    answer: "AWS Batch",
    explanation: "AWS Batch efficiently runs hundreds or thousands of batch computing jobs by dynamically provisioning resources."
  },
  // === Networking & Content Delivery ===
  {
    id: 21,
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
    id: 22,
    domain: "Networking & Content Delivery",
    question: "Which AWS service helps deliver content globally with low latency?",
    options: ["Amazon Route 53", "Amazon CloudFront", "AWS Direct Connect", "AWS Global Accelerator"],
    answer: "Amazon CloudFront",
    explanation: "CloudFront is a global content delivery network (CDN) that caches data at AWS edge locations to reduce latency for users."
  },
  {
    id: 23,
    domain: "Networking & Content Delivery",
    question: "Which AWS service can be used to register and manage domain names?",
    options: ["Amazon CloudFront", "Amazon Route 53", "AWS Direct Connect", "AWS Global Accelerator"],
    answer: "Amazon Route 53",
    explanation: "Route 53 provides domain registration, DNS routing, and health checking for resources inside and outside AWS."
  },
  {
    id: 24,
    domain: "Networking & Content Delivery",
    question: "A financial company needs to deliver media-rich training videos to consultants worldwide with minimal latency. Which AWS service should they use?",
    options: ["Amazon CloudFront", "Amazon Route 53", "AWS Direct Connect", "AWS Global Accelerator"],
    answer: "Amazon CloudFront",
    explanation: "Amazon CloudFront caches and distributes video and static content globally to ensure low latency and high performance."
  },
  {
    id: 25,
    domain: "Networking & Content Delivery",
    question: "A media company wants a service to manage domain registrations and route internet traffic to resources both inside and outside AWS. Which AWS service fits this need?",
    options: ["AWS Global Accelerator", "Amazon CloudFront", "AWS Direct Connect", "Amazon Route 53"],
    answer: "Amazon Route 53",
    explanation: "Route 53 provides both DNS management and domain registration, allowing routing to on-premises or AWS resources."
  },
  {
    id: 26,
    domain: "Networking & Content Delivery",
    question: "Which AWS service provides a dedicated network connection from an on-premises data center to AWS?",
    options: ["AWS VPN", "AWS PrivateLink", "AWS Direct Connect", "AWS Global Accelerator"],
    answer: "AWS Direct Connect",
    explanation: "Direct Connect establishes a private, dedicated connection between an on-premises network and AWS for consistent performance."
  },
  {
    id: 27,
    domain: "Networking & Content Delivery",
    question: "Which AWS service enables remote employees to securely connect to AWS and on-premises networks?",
    options: ["AWS Client VPN", "AWS Site-to-Site VPN", "AWS PrivateLink", "AWS Direct Connect"],
    answer: "AWS Client VPN",
    explanation: "AWS Client VPN is a managed client-based VPN solution that allows secure access for users from any location."
  },
  {
    id: 28,
    domain: "Networking & Content Delivery",
    question: "Which AWS feature allows creation of a private subnet to isolate resources from internet access?",
    options: ["Internet Gateway", "Private Subnet", "VPC Peering", "Route Table"],
    answer: "Private Subnet",
    explanation: "Private subnets in a VPC allow hosting of internal resources that are not directly accessible from the internet."
  },
  {
    id: 29,
    domain: "Networking & Content Delivery",
    question: "A company wants broad control of traffic in and out of a subnet using both allow and deny rules. What should they use?",
    options: ["Security Groups", "Network ACLs", "Route Tables", "PrivateLink"],
    answer: "Network ACLs",
    explanation: "Network ACLs operate at the subnet level and support both allow and deny rules for controlling traffic."
  },
  {
    id: 30,
    domain: "Networking & Content Delivery",
    question: "A healthcare company needs a private, dedicated connection to AWS for compliance reasons. Which AWS service should they use?",
    options: ["AWS Direct Connect", "AWS VPN", "AWS PrivateLink", "Amazon CloudFront"],
    answer: "AWS Direct Connect",
    explanation: "Direct Connect provides a secure and private connection, ideal for organizations with compliance and bandwidth requirements."
  },
  {
    id: 31,
    domain: "Networking & Content Delivery",
    question: "A company wants to route user requests based on health checks and latency to improve application performance. Which service should they use?",
    options: ["AWS Direct Connect", "Amazon CloudFront", "AWS Global Accelerator", "Amazon Route 53"],
    answer: "AWS Global Accelerator",
    explanation: "Global Accelerator routes traffic to optimal endpoints using AWS’s global network, improving availability and latency."
  },
  {
    id: 32,
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
    id: 33,
    domain: "Networking & Content Delivery",
    question: "Which AWS component provides secure connections between on-premises networks and AWS VPCs over the internet?",
    options: ["AWS Client VPN", "AWS Site-to-Site VPN", "AWS Direct Connect", "AWS Global Accelerator"],
    answer: "AWS Site-to-Site VPN",
    explanation: "Site-to-Site VPN establishes encrypted IPsec tunnels between customer sites and AWS over the internet."
  },
  {
    id: 34,
    domain: "Networking & Content Delivery",
    question: "Which network component allows traffic control at the instance level within a VPC?",
    options: ["Network ACLs", "Security Groups", "Route Tables", "Private Subnets"],
    answer: "Security Groups",
    explanation: "Security groups act as virtual firewalls for EC2 instances, controlling inbound and outbound traffic."
  },
  {
    id: 35,
    domain: "Networking & Content Delivery",
    question: "Which AWS feature allows control of inbound and outbound traffic at the subnet level?",
    options: ["Security Groups", "Network ACLs", "Route Tables", "VPC Peering"],
    answer: "Network ACLs",
    explanation: "Network ACLs operate at the subnet level, offering broader traffic control with both allow and deny rules."
  },
  {
    id: 36,
    domain: "Networking & Content Delivery",
    question: "A customer needs a dedicated connection to AWS for high bandwidth workloads. Which service provides this?",
    options: ["AWS Direct Connect", "AWS VPN", "AWS PrivateLink", "AWS Global Accelerator"],
    answer: "AWS Direct Connect",
    explanation: "Direct Connect delivers private, high-bandwidth connections between on-premises environments and AWS."
  },
  {
    id: 37,
    domain: "Networking & Content Delivery",
    question: "A company merged with another and wants to quickly provide secure remote access for global employees to AWS resources. Which solution fits best?",
    options: ["AWS Client VPN", "AWS Site-to-Site VPN", "AWS Direct Connect", "AWS PrivateLink"],
    answer: "AWS Client VPN",
    explanation: "Client VPN provides managed, secure access for remote employees using client software with authentication support."
  },
  {
    id: 38,
    domain: "Networking & Content Delivery",
    question: "Which AWS component enables a secure private connection between an on-premises data center and a VPC?",
    options: ["Internet Gateway", "Virtual Private Gateway", "Subnet", "Route Table"],
    answer: "Virtual Private Gateway",
    explanation: "A Virtual Private Gateway is used to establish VPN connections between on-premises networks and a VPC."
  },
  {
    id: 39,
    domain: "Networking & Content Delivery",
    question: "Which AWS service helps route traffic globally and improve performance by using static IP addresses and endpoint health?",
    options: ["AWS Global Accelerator", "Amazon Route 53", "Amazon CloudFront", "AWS Direct Connect"],
    answer: "AWS Global Accelerator",
    explanation: "Global Accelerator routes traffic through AWS’s global network to healthy endpoints for better performance and availability."
  },

  // === Security & Compliance ===
  {
    id: 40,
    domain: "Security & Compliance",
    question: "Which AWS service enables centralized identity management and access control across AWS accounts and services?",
    options: ["AWS IAM", "AWS Organizations", "AWS Control Tower", "AWS Cognito"],
    answer: "AWS IAM",
    explanation: "AWS Identity and Access Management (IAM) allows you to manage users, groups, and roles to securely control access to AWS resources."
  },
  {
    id: 41,
    domain: "Security & Compliance",
    question: "Which AWS service enables multi-account governance, allowing consolidated billing and policy management?",
    options: ["AWS IAM", "AWS Organizations", "AWS Control Tower", "AWS CloudFormation"],
    answer: "AWS Organizations",
    explanation: "AWS Organizations lets you centrally manage multiple AWS accounts with consolidated billing and service control policies."
  },
  {
    id: 42,
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
    id: 43,
    domain: "Security & Compliance",
    question: "Which AWS service provides DDoS protection for web applications?",
    options: ["AWS WAF", "AWS Shield", "Amazon Inspector", "AWS GuardDuty"],
    answer: "AWS Shield",
    explanation: "AWS Shield automatically protects applications running on AWS from DDoS attacks at no extra cost."
  },
  {
    id: 44,
    domain: "Security & Compliance",
    question: "Which AWS service lets you define fine-grained rules to filter and block web requests based on IP addresses or query strings?",
    options: ["AWS GuardDuty", "AWS WAF", "AWS Shield", "AWS CloudTrail"],
    answer: "AWS WAF",
    explanation: "AWS Web Application Firewall (WAF) protects applications by filtering and monitoring HTTP/S requests."
  },
  {
    id: 45,
    domain: "Security & Compliance",
    question: "Which AWS service continuously monitors for malicious activity and unauthorized behavior in your AWS environment?",
    options: ["Amazon Inspector", "AWS Config", "AWS GuardDuty", "AWS CloudTrail"],
    answer: "AWS GuardDuty",
    explanation: "GuardDuty uses machine learning and threat intelligence to detect suspicious activity and potential threats."
  },
  {
    id: 46,
    domain: "Security & Compliance",
    question: "Which AWS service provides a record of all account activity, including API calls and user logins?",
    options: ["AWS CloudWatch", "AWS Config", "AWS CloudTrail", "AWS Inspector"],
    answer: "AWS CloudTrail",
    explanation: "CloudTrail tracks and logs AWS account activity, including API usage, for auditing and compliance purposes."
  },
  {
    id: 47,
    domain: "Security & Compliance",
    question: "Which AWS service helps assess applications for vulnerabilities and deviations from security best practices?",
    options: ["AWS Shield", "AWS WAF", "Amazon Inspector", "AWS Config"],
    answer: "Amazon Inspector",
    explanation: "Amazon Inspector automatically scans workloads for vulnerabilities and generates detailed findings."
  },
  {
    id: 48,
    domain: "Security & Compliance",
    question: "Which AWS service helps track configuration changes to AWS resources over time for compliance purposes?",
    options: ["AWS Config", "AWS CloudTrail", "AWS CloudWatch", "AWS Trusted Advisor"],
    answer: "AWS Config",
    explanation: "AWS Config records configuration changes and evaluates them against compliance rules and best practices."
  },
  {
    id: 49,
    domain: "Security & Compliance",
    question: "Which AWS service provides real-time security recommendations for improving your AWS environment?",
    options: ["AWS Trusted Advisor", "AWS GuardDuty", "AWS Security Hub", "Amazon Inspector"],
    answer: "AWS Trusted Advisor",
    explanation: "Trusted Advisor offers real-time guidance to optimize performance, reduce costs, and improve security and fault tolerance."
  }
];
