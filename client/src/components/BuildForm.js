import { Button, Col, Form, Row } from "react-bootstrap";
import useSWRImmutable from "swr/immutable";
import Margin from "react-margin";
import Typography from "./Typography";

function Input({ input, formMode, onChange }) {
    return (
        <Form.Control type={input.type ? input.type : "text"} as={input.as ? input.as : "input"} disabled={formMode ? input.disabled : false} defaultValue={input.defaultValue ? input.defaultValue : null} name={input.name} required={input.required === false ? false : true} onChange={onChange} />
    );
}

function Select({ input, formMode, onChange }) {
    return (
        <Form.Select onChange={onChange} name={input.name} disabled={formMode ? input.disabled : false} required={input.required === false ? false : true}>
            {input.defaultValue >= 0 ? <option value={input.defaultValue}>{input.options[input.defaultValue]}</option> : <option></option>}
            {input.options.map((option, index) => {
                return (
                    <option key={index} value={index}>{option}</option>
                )
            })}
        </Form.Select>
    );
}

function SelectData({ input, formMode, onChange }) {
    const { data } = useSWRImmutable(input.route);
    return (
        <Form.Select onChange={onChange} name={input.name} required={input.required === false ? false : true} disabled={formMode ? input.disabled : false}>
            {input.defaultValue ? <option value={input.defaultValue}>{data.data[input.defaultValue - 1][input.option.key]}</option> : <option></option>}
            {data.data.map((x, index) => {
                return (
                    <option key={index} value={x.id}>{x[input.option.key]}</option>
                )
            })}
        </Form.Select>
    );
}

function BuildForm({ validated, inputs = [], onSubmit, onChange, formMode = 0, submitButton = "Crear" }) {
    return (
        <Form noValidate={true} validated={validated} onSubmit={onSubmit}>
            <Margin>
                <Row className="g-3">
                    {inputs.map((input, index) => {
                        return (
                            <Col lg={6} key={index} hidden={formMode === 0 ? (input.hidden ? true : false) : false}>
                                <Form.Label>{input.title}</Form.Label>
                                
                                {input.type !== "select" ? <Input input={input} formMode={formMode} onChange={onChange} /> : (input.route ? <SelectData formMode={formMode} input={input} onChange={onChange} /> : <Select input={input} formMode={formMode} onChange={onChange} />)}
                                <Typography variant="muted" className="small" type="span">{input.description ? input.description : null}</Typography>
                            </Col>
                        )
                    })}
                </Row>
            </Margin>
            <Margin className="text-end">
                <Button type="submit">{submitButton}</Button>
            </Margin>
        </Form>
    );
}

export default BuildForm;
