import type {
	ILoginFormPanelNetworkEdge,
	ILoginFormPanelNetworkNode,
} from "./LoginFormPanelNetwork";

/** Murabei login easter eggs — ciência, colaboração, sistemas complexos e IA. */
export const MURABEI_LOGIN_NETWORK_NODES: ILoginFormPanelNetworkNode[] = [
	{
		id: "origem",
		x: 12,
		y: 22,
		title: "🐜 Murabei?",
		message:
			"Do russo муравей: formiga. Pequenos agentes, grandes sistemas.",
	},
	{
		id: "sistemas",
		x: 28,
		y: 12,
		title: "O todo é maior",
		message:
			"Uma formiga não explica o formigueiro. Os padrões surgem das conexões.",
	},
	{
		id: "metodo",
		x: 50,
		y: 18,
		title: "E se estivermos errados?",
		message:
			"Uma boa hipótese não precisa estar certa. Precisa poder ser testada.",
	},
	{
		id: "reproducibilidade",
		x: 88,
		y: 28,
		title: "Na minha máquina funciona...",
		message:
			"Então ainda temos um experimento para reproduzir.",
	},
	{
		id: "colaboracao",
		x: 10,
		y: 55,
		title: "Nenhum nodo está sozinho",
		message: "Conhecimento cresce quando ideias se conectam.",
	},
	{
		id: "ia",
		x: 78,
		y: 52,
		title: "IA não é piloto automático",
		message:
			"A máquina acelera. O humano questiona, decide e assume a responsabilidade.",
	},
	{
		id: "engenharia",
		x: 92,
		y: 78,
		title: "Não existe só caminho feliz",
		message:
			"Sistemas confiáveis também são construídos pensando no que pode dar errado.",
	},
	{
		id: "revisao",
		x: 35,
		y: 82,
		title: "Dois olhares, menos vieses",
		message:
			"Revisar não é desconfiar. É construir algo melhor juntos.",
	},
	{
		id: "evolucao",
		x: 62,
		y: 88,
		title: "Deploy não é o fim",
		message:
			"É quando o mundo real começa a testar nossas hipóteses.",
	},
];

export const MURABEI_LOGIN_NETWORK_EDGES: ILoginFormPanelNetworkEdge[] = [
	{ from: "origem", to: "sistemas" },
	{ from: "sistemas", to: "metodo" },
	{ from: "metodo", to: "reproducibilidade" },
	{ from: "metodo", to: "ia" },
	{ from: "origem", to: "colaboracao" },
	{ from: "colaboracao", to: "metodo" },
	{ from: "colaboracao", to: "revisao" },
	{ from: "reproducibilidade", to: "ia" },
	{ from: "ia", to: "engenharia" },
	{ from: "engenharia", to: "evolucao" },
	{ from: "revisao", to: "evolucao" },
	{ from: "reproducibilidade", to: "engenharia" },
	{ from: "revisao", to: "reproducibilidade" },
];