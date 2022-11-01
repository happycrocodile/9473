import routes from "../routes";
import { Row, Col, Table, ListGroup } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import useSWR from "swr";
import config, { generateChips, generateWallet, generateComparisonChartJSData, generateHistoryChartJSData } from "../config/dashboard";
import Margin from "react-margin";
import Paper from "../components/Paper";
import Title from "../components/Title";
import Typography from "../components/Typography";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";

function Chip({ icon, title, totalNumber }) {
    return (
        <Paper>
            <Title title={title} icon={icon} />
            <Margin bottom={2} className="text-end">
                <Typography variant="muted">Total de</Typography>
                <Typography type="h2">{totalNumber}</Typography>
            </Margin>
        </Paper>
    );
}

function Leaderboard({ title, icon, columns, data = [] }) {
    return (
        <Paper>
            <Title title={title} icon={icon} />
            <Table responsive={true} borderless={true} hover={true}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        {columns.map((column, index) => {
                            return (
                                <th key={index}>{column.name}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((x, index) => {
                        return (
                            <tr key={index} className={index === 0 ? "table-warning" : null}>
                                <td>{index + 1}</td>
                                <td>{x.id}</td>
                                {columns.map((column, index) => {
                                    return (
                                        <td key={index}>{x[column.key]}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Paper>
    );
}

function ChartCard({ title, icon, children }) {
    return (
        <Paper>
            <Title title={title} icon={icon} />
            <Margin>{children}</Margin>
        </Paper>
    );
}

function Chips({ data }) {
    return (
        <Margin>
            <Row className="g-3">
                {generateChips(data).map((chip, index) => {
                    return (
                        <Col key={index} lg={3}>
                            <Chip icon={chip.icon} title={chip.title} totalNumber={chip.total_number} />
                        </Col>
                    )
                })}
            </Row>
        </Margin>
    );
}

function Wallet({ data }) {
    return (
        <Paper>
            <Title title="Billetera" icon={faHandRock} />
            <Margin>
                <Pie data={generateWallet(data)} options={config.chart_js.options} />
            </Margin>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Typography variant="muted">Total de ingresos</Typography>
                    <Typography>${data.profit_amount}</Typography>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Typography variant="muted">Total de devoluciones</Typography>
                    <Typography>${data.refund_amount}</Typography>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Typography variant="muted">Total bruto</Typography>
                    <Typography>${data.income_amount}</Typography>
                </ListGroup.Item>
            </ListGroup>
        </Paper>
    );
}

function Dashboard() {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

    const { data: statistics } = useSWR(routes.statistics);

    const genders = generateComparisonChartJSData("genders", [statistics.data.genders.male, statistics.data.genders.female, statistics.data.genders.other]);
    const customerStatus = generateComparisonChartJSData("customer_status", [statistics.data.customer_status.active, statistics.data.customer_status.inactive]);
    const feedbackRating = generateComparisonChartJSData("feedback_rating", [statistics.data.feedback_rating.positive, statistics.data.feedback_rating.negative]);

    const history = generateHistoryChartJSData(statistics.data.statistics);

    return (
        <>
            <Chips data={statistics.data.total} />
            <Margin>
                <Row>
                    {[genders, customerStatus, feedbackRating].map((x, index) => {
                        return (
                            <Col key={index} lg={4}>
                                <ChartCard title={x.title} icon={x.icon}>
                                    <Doughnut data={x.data} options={config.chart_js.options} />
                                </ChartCard>
                            </Col>
                        );
                    })}
                </Row>
            </Margin>
            <Margin>
                <Row>
                    <Col>
                        <Paper>
                            <Title title={history.title} icon={history.icon} />
                            <Line data={history.data} options={config.chart_js.options} />
                        </Paper>
                    </Col>
                </Row>
            </Margin>
            <Margin>
            <Row>
                <Col lg={8}>
                    <Leaderboard title="Clientes mas activos" icon={faHandRock} columns={config.columns.customers} data={statistics.data.leaderboards.customers} />
                </Col>
                <Col lg={4}>
                    <Wallet data={statistics.data.wallet} />
                </Col>
            </Row>
            </Margin>
            <Row>
                <Col lg={6}>
                    <Leaderboard title="Productos mas vendidos" icon={faHandRock} columns={config.columns.products} data={statistics.data.leaderboards.products} />
                </Col>
                <Col lg={6}>
                    <Leaderboard title="Últimos comentarios" icon={faHandRock} columns={config.columns.last_feedbacks} data={statistics.data.last_feedbacks} />
                </Col>
            </Row>
        </>
    );
}

export default Dashboard;
