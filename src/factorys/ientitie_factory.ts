import Pessoa from "../entities/pessoa";
import { IEntitie } from "../interfaces/ientitie";

const iEntitieFactory = (entitie:any):IEntitie | null => {
    if (!entitie)
        throw new Error("Parâmetro inválido.")

    if (entitie instanceof Pessoa){
        return new Pessoa(
            entitie.apelido, entitie.nome, entitie.nascimento.toString(), entitie.stack, entitie.id
        )
    }
    return null
}

export default iEntitieFactory