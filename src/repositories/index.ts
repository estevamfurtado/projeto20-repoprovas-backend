import { businessRepository } from "./businessRepository"
import { cardRepository } from "./cardRepository"
import { companyRepository } from "./companyRepository"
import { employeeRepository } from "./employeeRepository"
import { paymentRepository } from "./paymentRepository"
import { rechargeRepository } from "./rechargeRepository"

export const repos = {
    business: businessRepository,
    card: cardRepository,
    company: companyRepository,
    employee: employeeRepository,
    payment: paymentRepository,
    recharge: rechargeRepository
}