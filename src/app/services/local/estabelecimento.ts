/**
 * Modelo da ficha para enviar pelo o WhatsApp
 * 
 * Nome:
 * End:
 * Tel:
 * WhatsApp:
 * Email:
 * valor médio do atendimento:
 * Descrição dos serviços:
 *
 */
export class Estabelecimento {
  ativo: boolean;
  nome?: string;
  end?: string;
  tel?: string;
  whatsapp?: string;
  email?: string;
  valor?: string;
  servicos?: string[];
  descricao_servicos?: string;
  mapa?: string;
  video?: string;
  bairros_atendidos?: string;
  crp?: string;
  crm?: string;
}
