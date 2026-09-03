
import { cadastrarFarmacia } from "../controller/farmacia.controller.mjs";

export default function farmaciaRoutes(router) {
    router.post("/cadastrarFarmacia", cadastrarFarmacia)
}