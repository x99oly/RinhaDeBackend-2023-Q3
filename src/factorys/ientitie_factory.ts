import Pessoa from "../entities/pessoa";
import { IEntitie } from "../interfaces/ientitie";

const iEntitieFactory = (entitie:any):IEntitie | null => {

    if (!entitie)
        throw new Error("Parâmetro inválido.")

    try{
        return new Pessoa(
            entitie.apelido, entitie.nome, entitie.nascimento.toString(), entitie.stack, entitie.id
        )
    } catch (error) {
        console.log(`Erro ao recuperar entitie: ${entitie}`)
        return null
    }
}

export default iEntitieFactory