class VerificaPermissao {

    static permission(next, token, permissao) {
        next();
    }
}

export default VerificaPermissao;