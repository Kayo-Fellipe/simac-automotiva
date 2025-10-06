/**
 * SIMAC - Products Database
 * Comprehensive product catalog data
 */

const productsData = [
    // Óleos de Motor
    {
        id: 1,
        name: "Shell Helix Ultra 5W-30",
        brand: "Shell",
        category: "Óleo de Motor",
        partNumber: "SH-HU530-5L",
        viscosity: "5W-30",
        volume: "5L",
        availability: "in-stock",
        description: "Óleo de motor totalmente sintético para máximo desempenho do motor"
    },
    {
        id: 2,
        name: "Castrol GTX 10W-40",
        brand: "Castrol",
        category: "Óleo de Motor",
        partNumber: "CS-GTX1040-4L",
        viscosity: "10W-40",
        volume: "4L",
        availability: "in-stock",
        description: "Óleo de motor convencional premium com proteção superior"
    },
    {
        id: 3,
        name: "Mobil 1 ESP Formula 5W-30",
        brand: "Mobil",
        category: "Óleo de Motor",
        partNumber: "MB-ESP530-1L",
        viscosity: "5W-30",
        volume: "1L",
        availability: "special-order",
        description: "Óleo de motor sintético avançado para veículos europeus"
    },
    {
        id: 4,
        name: "Valvoline MaxLife 10W-40",
        brand: "Valvoline",
        category: "Óleo de Motor",
        partNumber: "VV-ML1040-5L",
        viscosity: "10W-40",
        volume: "5L",
        availability: "in-stock",
        description: "Especialmente formulado para veículos com mais de 240.000 km"
    },
    {
        id: 5,
        name: "Total Quartz 9000 5W-40",
        brand: "Total",
        category: "Óleo de Motor",
        partNumber: "TT-Q9540-4L",
        viscosity: "5W-40",
        volume: "4L",
        availability: "in-stock",
        description: "Óleo de motor sintético de alta performance para motores a gasolina e diesel"
    },

    // Fluidos de Transmissão
    {
        id: 6,
        name: "Shell Spirax S4 ATF HDX",
        brand: "Shell",
        category: "Fluido de Transmissão",
        partNumber: "SH-S4HDX-1L",
        volume: "1L",
        availability: "in-stock",
        description: "Fluido de transmissão automática premium para aplicações pesadas"
    },
    {
        id: 7,
        name: "Castrol Transmax Dex/Merc",
        brand: "Castrol",
        category: "Fluido de Transmissão",
        partNumber: "CS-TMDM-4L",
        volume: "4L",
        availability: "special-order",
        description: "Fluido de transmissão automática multiveículos"
    },
    {
        id: 8,
        name: "Mobil ATF 320",
        brand: "Mobil",
        category: "Fluido de Transmissão",
        partNumber: "MB-ATF320-20L",
        volume: "20L",
        availability: "in-stock",
        description: "Fluido de transmissão automática premium para veículos comerciais"
    },

    // Fluidos de Freio
    {
        id: 9,
        name: "Shell Brake Fluid DOT 4",
        brand: "Shell",
        category: "Fluido de Freio",
        partNumber: "SH-BF4-500ML",
        volume: "500ml",
        availability: "in-stock",
        description: "Fluido de freio de alta performance atendendo especificações DOT 4"
    },
    {
        id: 10,
        name: "Castrol Response DOT 4",
        brand: "Castrol",
        category: "Fluido de Freio",
        partNumber: "CS-RES4-1L",
        volume: "1L",
        availability: "in-stock",
        description: "Fluido de freio superior para desempenho de frenagem aprimorado"
    },
    {
        id: 11,
        name: "Valvoline Super DOT 3",
        brand: "Valvoline",
        category: "Fluido de Freio",
        partNumber: "VV-SD3-355ML",
        volume: "355ml",
        availability: "special-order",
        description: "Fluido de freio de alta qualidade para aplicações automotivas padrão"
    },

    // Fluidos de Arrefecimento
    {
        id: 12,
        name: "Shell Premium Antifreeze",
        brand: "Shell",
        category: "Fluido de Arrefecimento",
        partNumber: "SH-PA-5L",
        volume: "5L",
        availability: "in-stock",
        description: "Concentrado anticongelante à base de etilenoglicol de longa duração"
    },
    {
        id: 13,
        name: "Castrol Radicool SF",
        brand: "Castrol",
        category: "Fluido de Arrefecimento",
        partNumber: "CS-RSF-20L",
        volume: "20L",
        availability: "in-stock",
        description: "Fluido de arrefecimento de vida estendida sem silicato para motores modernos"
    },
    {
        id: 14,
        name: "Total Glacelf Auto Supra",
        brand: "Total",
        category: "Fluido de Arrefecimento",
        partNumber: "TT-GAS-4L",
        volume: "4L",
        availability: "special-order",
        description: "Fluido de arrefecimento premium com tecnologia de ácido orgânico"
    },

    // Fluidos Hidráulicos
    {
        id: 15,
        name: "Shell Tellus S2 M 46",
        brand: "Shell",
        category: "Fluido Hidráulico",
        partNumber: "SH-TS2M46-20L",
        volume: "20L",
        availability: "in-stock",
        description: "Fluido hidráulico antidesgaste de alta qualidade para equipamentos móveis"
    },
    {
        id: 16,
        name: "Mobil DTE 25",
        brand: "Mobil",
        category: "Fluido Hidráulico",
        partNumber: "MB-DTE25-208L",
        volume: "208L",
        availability: "special-order",
        description: "Óleo hidráulico superior para aplicações industriais"
    },

    // Óleos de Engrenagem
    {
        id: 17,
        name: "Shell Spirax S3 AX 80W-90",
        brand: "Shell",
        category: "Óleo de Engrenagem",
        partNumber: "SH-S3AX8090-1L",
        viscosity: "80W-90",
        volume: "1L",
        availability: "in-stock",
        description: "Óleo de engrenagem de alta performance para diferenciais automotivos"
    },
    {
        id: 18,
        name: "Castrol EPX 80W-90",
        brand: "Castrol",
        category: "Óleo de Engrenagem",
        partNumber: "CS-EPX8090-5L",
        viscosity: "80W-90",
        volume: "5L",
        availability: "in-stock",
        description: "Lubrificante de engrenagem para serviço pesado para veículos comerciais"
    },
    {
        id: 19,
        name: "Valvoline SynPower 75W-90",
        brand: "Valvoline",
        category: "Óleo de Engrenagem",
        partNumber: "VV-SP7590-1L",
        viscosity: "75W-90",
        volume: "1L",
        availability: "special-order",
        description: "Óleo de engrenagem totalmente sintético para proteção aprimorada"
    },

    // Graxas
    {
        id: 20,
        name: "Shell Gadus S3 V220C 2",
        brand: "Shell",
        category: "Graxa",
        partNumber: "SH-GSV220-400G",
        nlgiGrade: "2",
        volume: "400g",
        availability: "in-stock",
        description: "Graxa de complexo de lítio de alta performance para condições extremas"
    },
    {
        id: 21,
        name: "Castrol LMX Li-Complex 2",
        brand: "Castrol",
        category: "Graxa",
        partNumber: "CS-LMX2-18KG",
        nlgiGrade: "2",
        volume: "18kg",
        availability: "in-stock",
        description: "Graxa de complexo de lítio premium para aplicações automotivas"
    },

    // Fluidos de Direção Hidráulica
    {
        id: 22,
        name: "Shell Donax TA",
        brand: "Shell",
        category: "Fluido de Direção Hidráulica",
        partNumber: "SH-DTA-1L",
        volume: "1L",
        availability: "in-stock",
        description: "Fluido multiuso para direção hidráulica e transmissões automáticas"
    },
    {
        id: 23,
        name: "Mobil ATF D/M",
        brand: "Mobil",
        category: "Fluido de Direção Hidráulica",
        partNumber: "MB-ATFDM-946ML",
        volume: "946ml",
        availability: "special-order",
        description: "Fluido de direção hidráulica especificação Dexron/Mercon"
    },

    // Filtros de Óleo
    {
        id: 24,
        name: "Filtro de Óleo VOX 1234",
        brand: "VOX",
        category: "Filtro de Óleo",
        partNumber: "VOX-FO1234",
        availability: "in-stock",
        description: "Filtro de óleo de alta eficiência para motores a gasolina e diesel"
    },
    {
        id: 25,
        name: "Filtro de Óleo Fram PH10575",
        brand: "Fram",
        category: "Filtro de Óleo",
        partNumber: "FRAM-PH10575",
        availability: "in-stock",
        description: "Filtro de óleo premium com tecnologia de mídia sintética"
    },

    // Filtros de Ar
    {
        id: 26,
        name: "Filtro de Ar VOX 5678",
        brand: "VOX",
        category: "Filtro de Ar",
        partNumber: "VOX-FA5678",
        availability: "in-stock",
        description: "Filtro de ar de alta capacidade para máxima proteção do motor"
    },
    {
        id: 27,
        name: "Filtro de Ar Tecfil ARL6891",
        brand: "Tecfil",
        category: "Filtro de Ar",
        partNumber: "TECFIL-ARL6891",
        availability: "in-stock",
        description: "Filtro de ar com tecnologia de filtragem multicamadas"
    },

    // Filtros de Combustível
    {
        id: 28,
        name: "Filtro de Combustível VOX 9012",
        brand: "VOX",
        category: "Filtro de Combustível",
        partNumber: "VOX-FC9012",
        availability: "in-stock",
        description: "Filtro de combustível de alta eficiência para motores diesel"
    },
    {
        id: 29,
        name: "Filtro de Combustível Fram G3738",
        brand: "Fram",
        category: "Filtro de Combustível",
        partNumber: "FRAM-G3738",
        availability: "special-order",
        description: "Filtro de combustível premium para gasolina e etanol"
    },

    // Filtros de Cabine
    {
        id: 30,
        name: "Filtro de Cabine VOX 3456",
        brand: "VOX",
        category: "Filtro de Cabine",
        partNumber: "VOX-FCAB3456",
        availability: "in-stock",
        description: "Filtro de cabine com carvão ativado para máxima purificação do ar"
    }
];

// Export for global use
window.productsData = productsData;
