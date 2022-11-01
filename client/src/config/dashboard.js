import routes from "../routes";
import themes from "../themes";
import { faBell, faHandRock } from "@fortawesome/free-regular-svg-icons";

export const generateWallet = data => {
    return {
        labels: ["Ingresos", "Devoluciones"],
        datasets: [
            {
                data: [data.profit_amount, data.refund_amount],
                backgroundColor: [themes.primary, themes.secondary],
                hoverOffset: 4,
            },
        ],
    };
};

export const generateHistoryChartJSData = data => {
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const totalCustomers = [];
    const totalOrders = [];
    const totalCanceledOrders = [];
    const totalFeedbacks = [];

    data.forEach(x => {
        totalCustomers.push(x.total_customers);
        totalOrders.push(x.total_orders);
        totalCanceledOrders.push(x.total_canceled_orders);
        totalFeedbacks.push(x.total_feedbacks);
    });

    totalCustomers.reverse();
    totalOrders.reverse();
    totalCanceledOrders.reverse();
    totalFeedbacks.reverse();

    return {
        title: "Estadística anual",
        icon: faBell,
        data: {
            labels: months,
            datasets: [
                {
                    label: "Clientes",
                    data: totalCustomers,
                    backgroundColor: themes.primary,
                },
                {
                    label: "Pedidos",
                    data: totalOrders,
                    backgroundColor: themes.secondary,
                },
                {
                    label: "Pedidos cancelados",
                    data: totalCanceledOrders,
                    backgroundColor: themes.tertiary,
                },
                {
                    label: "Comentarios",
                    data: totalFeedbacks,
                    backgroundColor: themes.fourth,
                }
            ],
        }
    };
};

export const generateComparisonChartJSData = (key, data = []) => {
    const comparisons = {
        genders: {
            title: "Géneros más frecuentes",
            icon: faBell,
            options: ["Masculino", "Femenino", "Otro"]
        },
        customer_status: {
            title: "Estado de los clientes",
            icon: faBell,
            options: ["Activos", "Inactivos"]
        },
        feedback_rating: {
            title: "Clasificación de comentarios",
            icon: faBell,
            options: ["Positivos", "Negativos"]
        },
    };

    return {
        title: comparisons[key].title,
        icon: comparisons[key].icon,
        data: {
            labels: comparisons[key].options,
            datasets: [
                {
                    data: data,
                    backgroundColor: [themes.primary, themes.secondary, themes.tertiary],
                    hoverOffset: 4,
                },
            ],
        }
    };
};

export const generateChips = data => {
    return [
        {
            icon: faBell,
            title: "Clientes",
            total_number: data.customers
        },
        {
            icon: faBell,
            title: "Pedidos",
            total_number: data.orders
        },
        {
            icon: faBell,
            title: "Pedidos cancelados",
            total_number: data.canceled_orders
        },
        {
            icon: faBell,
            title: "Comentarios",
            total_number: data.feedbacks
        }
    ]
};

const chartJSOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
            labels: {
                padding: 12
            }
        },
        tooltip: {
            displayColors: false,
            padding: 12,
            backgroundColor: themes.dark
        }
    }
};

const columns = {
    customers: [
        {
            name: "Nombre",
            key: "first_name"
        },
        {
            name: "Apellido",
            key: "last_name"
        },
        {
            name: "Teléfono",
            key: "phone"
        },
        {
            name: "Total de compras",
            key: "total_purchases"
        }
    ],
    products: [
        {
            name: "Nombre",
            key: "name"
        },
        {
            name: "Total de ventas",
            key: "total_sales"
        },
    ],
    last_feedbacks: [
        {
            name: "Comentario",
            key: "description",
        },
    ]
};

const config = {
    title: "Dashboard",
    icon: faHandRock,
    route: routes.dashboard,
    columns: columns,
    chart_js: {
        options: chartJSOptions,
    },
};

export default config;
