const { emptyValues } = require("../../app/middlewares/validatePlayer");

const mockRequest = (name, password, level) => {
    return {
        body: {
            name,
            password,
            level
        }
    };
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe("Provant valors incorrectes", () => {
    test("Usuari sí, contrassenya no definida, level=0", () => {
        const req = mockRequest('user',null,0);
        const res = mockResponse();
        const next = mockNext;
        emptyValues(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });
    test("Usuari i contrassenya no definits, level=0", () => {
        const req = mockRequest(null,null,0);
        const res = mockResponse();
        const next = mockNext;
        emptyValues(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
    });
});

describe("Valors correctes", () => {
    test("Usuari i contrassenya definits, level=0", () => {
        const req = mockRequest('user','password',0)
        const res = mockResponse();
        const next = mockNext;
        emptyValues(req, res, next);
        expect(mockNext).toHaveBeenCalled();
    });
    test("Usuari i contrassenya definits, level=1", () => {
        const req = mockRequest('user','password',1)
        const res = mockResponse();
        const next = mockNext;
        emptyValues(req, res, next);
        expect(mockNext).toHaveBeenCalled();
    });
    test("Usuari i contrassenya no definits, level=1", () => {
        const req = mockRequest(null,null,1)
        const res = mockResponse();
        const next = mockNext;
        emptyValues(req, res, next);
        expect(mockNext).toHaveBeenCalled();
    });
});