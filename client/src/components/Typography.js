import { createElement } from "react";

function Typography({ children, type = "h6", variant, className }) {

    let index = null;

    if (variant) index = "text" + String.fromCharCode(45) + variant;

    if (className) index += String.fromCharCode(32) + className;
    
    return createElement(type, { className: index }, children);
}

export default Typography;
