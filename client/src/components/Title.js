import Margin from "react-margin";
import Typography from "./Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Title({ icon, title }) {

    return (
        <Margin size={4} className="hstack">
            <Margin end={1}>
                <FontAwesomeIcon icon={icon} />
            </Margin>
            <Typography>{title}</Typography>
        </Margin>
    );
}

export default Title;