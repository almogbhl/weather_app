const title_case = str => {
    str = str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
    return str.replace("-", " ")
};

export default title_case;
