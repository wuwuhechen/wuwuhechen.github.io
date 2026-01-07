// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [
	// Frontend Skills
	{
		id: "css",
		name: "CSS",
		description:
			"简单而强大的样式表语言，用于描述HTML和XML文档的外观和格式。",
		icon: "logos:css-3",
		category: "frontend",
		level: "beginner",
		experience: { years: 0, months: 5 },
		color: "#264DE4",
	},
	{
		id: "html",
		name: "HTML",
		description:
			"超文本标记语言，是构建网页的基础，用于定义网页的结构和内容。",
		icon: "logos:html-5",
		category: "frontend",
		level: "beginner",
		experience: { years: 0, months: 5 },
	},
	{
		id: "javascript",
		name: "JavaScript",
		description:
			"广泛使用的编程语言，主要用于网页开发，实现动态交互效果和功能。",
		icon: "logos:javascript",
		category: "frontend",
		level: "intermediate",
		experience: { years: 0, months: 3 },
	},

	// Backend Skills
	{
		id: "cpp",
		name: "C++",
		description:
			"高性能的系统编程语言，广泛应用于游戏开发、嵌入式系统和高频交易等领域。",
		icon: "logos:c-plusplus",
		category: "backend",
		level: "intermediate",
		experience: { years: 3, months: 6 },
		projects: [
			"mizuki-blog",
			"portfolio-website",
			"data-visualization-tool",
		],
		color: "#d16aa3ff",
	},
	{
		id: "python",
		name: "Python",
		description:
			"功能强大且易于学习的编程语言，广泛应用于Web开发、数据分析、人工智能等领域。",
		icon: "logos:typescript-icon",
		category: "backend",
		level: "beginner",
		experience: { years: 2, months: 8 },
		projects: ["mizuki-blog", "portfolio-website", "task-manager-app"],
		color: "#3178C6",
	},
	{
		id: "java",
		name: "Java",
		description:
			"广泛使用的面向对象编程语言，具有跨平台特性，常用于企业级应用开发。",
		icon: "logos:java",
		category: "backend",
		level: "beginner",
		experience: { years: 0, months: 1 },
		projects: ["enterprise-system", "microservices-api"],
		color: "#ED8B00",
	},
	{
		id: "c",
		name: "C",
		description:
			"通用的编程语言，广泛应用于系统编程、嵌入式系统和操作系统开发。",
		icon: "logos:c",
		category: "backend",
		level: "intermediate",
		experience: { years: 1, months: 2 },
		projects: ["embedded-system", "kernel-module"],
		color: "#A8B9CC",
	},

	// Database Skills
	{
		id: "mysql",
		name: "MySQL",
		description:
			"流行的开源关系型数据库管理系统，广泛应用于Web应用和企业级应用中。",
		icon: "logos:mysql-icon",
		category: "database",
		level: "intermediate",
		experience: { years: 2, months: 6 },
		projects: ["e-commerce-platform", "blog-system"],
		color: "#4479A1",
	},

	// Tools
	{
		id: "git",
		name: "Git",
		description: "分布式版本控制系统，是代码管理和团队协作的必备工具。",
		icon: "logos:git-icon",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#F05032",
	},
	{
		id: "vscode",
		name: "VS Code",
		description: "代码编辑器，支持多种编程语言和扩展，提供强大的开发体验。",
		icon: "logos:visual-studio-code",
		category: "tools",
		level: "advanced",
		experience: { years: 3, months: 0 },
		color: "#007ACC",
	},
	{
		id: "intellij",
		name: "IntelliJ IDEA",
		description: "java开发的强大IDE，提供智能代码补全、重构和调试功能。",
		icon: "logos:intellij-idea",
		category: "tools",
		level: "beginner",
		experience: { years: 0, months: 1 },
		projects: ["java-enterprise", "spring-boot-app"],
		color: "#616161", // 更改为深灰色，避免纯黑色
	},
	{
		id: "pycharm",
		name: "PyCharm",
		description:
			"专业的Python IDE，提供智能代码补全、调试和测试功能，提升开发效率。",
		icon: "logos:pycharm",
		category: "tools",
		level: "intermediate",
		experience: { years: 1, months: 4 },
		projects: ["python-web-app", "data-analysis"],
		color: "#21D789",
	},
	{
		id: "photoshop",
		name: "Photoshop",
		description: "专业的图像编辑软件，用于创建和编辑高质量的图形和照片。",
		icon: "logos:adobe-photoshop",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 6 },
		projects: ["ui-design", "image-processing"],
		color: "#31A8FF",
	},

	// Other Skills
];

// Get skill statistics
export const getSkillStats = () => {
	const total = skillsData.length;
	const byLevel = {
		beginner: skillsData.filter((s) => s.level === "beginner").length,
		intermediate: skillsData.filter((s) => s.level === "intermediate")
			.length,
		advanced: skillsData.filter((s) => s.level === "advanced").length,
		expert: skillsData.filter((s) => s.level === "expert").length,
	};
	const byCategory = {
		frontend: skillsData.filter((s) => s.category === "frontend").length,
		backend: skillsData.filter((s) => s.category === "backend").length,
		database: skillsData.filter((s) => s.category === "database").length,
		tools: skillsData.filter((s) => s.category === "tools").length,
		other: skillsData.filter((s) => s.category === "other").length,
	};

	return { total, byLevel, byCategory };
};

// Get skills by category
export const getSkillsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return skillsData;
	}
	return skillsData.filter((s) => s.category === category);
};

// Get advanced skills
export const getAdvancedSkills = () => {
	return skillsData.filter(
		(s) => s.level === "advanced" || s.level === "expert",
	);
};

// Calculate total years of experience
export const getTotalExperience = () => {
	const totalMonths = skillsData.reduce((total, skill) => {
		return total + skill.experience.years * 12 + skill.experience.months;
	}, 0);
	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
