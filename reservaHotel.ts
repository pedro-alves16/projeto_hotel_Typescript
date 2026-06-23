enum CategoriaQuarto {
  STANDARD = "STANDARD",
  LUXO = "LUXO",
  SUITE = "SUITE",
}

type Quarto = {
  numero: number;
  categoria: CategoriaQuarto;
  precoPorNoite: number;
  disponivel: boolean;
};

type Reserva = {
  id: string;
  quarto: Quarto;
  nomeHospede: string;
  checkIn: Date;
  checkOut: Date;
};

class Hotel {
  private quartos: Quarto[];
  private reservas: Reserva[];

  constructor() {
    this.quartos = [];
    this.reservas = [];
  }

  cadastrarQuarto(quarto: Quarto): void {
    const quartoExistente = this.quartos.find(
      (qrto) => quarto.numero === qrto.numero,
    );

    if (quartoExistente) {
      console.log(quartoExistente);
      throw new Error("quarto já cadastrado!");
    }

    this.quartos.push(quarto);
    console.log("---------------QUARTOS CADASTRADOS:----------------");
    console.table(this.quartos);
  }

  buscarQuartosDisponiveis(categoria?: CategoriaQuarto): Quarto[] {
    const quartosDisponiveis: Quarto[] = [];

    if (categoria) {
      for (let quarto of this.quartos) {
        if (quarto.disponivel === true && quarto.categoria === categoria) {
          quartosDisponiveis.push(quarto);
        }
      }
      return quartosDisponiveis;
    }

    for (let quarto of this.quartos) {
      if (quarto.disponivel === true) {
        quartosDisponiveis.push(quarto);
      }
    }

    return quartosDisponiveis;
  }

  fazerReserva(
    nomeHospede: string,
    checkIn: string,
    checkOut: string,
    numQuarto: number,
  ): Reserva {
    const quartosDisponiveis = this.buscarQuartosDisponiveis();

    const quartoDesejado = quartosDisponiveis.find(
      (qrto) => numQuarto === qrto.numero,
    );

    if (!quartoDesejado || quartoDesejado.disponivel === false)
      throw Error("Quarto Não Disponível para reserva: " + numQuarto);

    const dataEntrada: Date = new Date(checkIn);
    const dataSaida: Date = new Date(checkOut);
    const dataValida: boolean =
      dataEntrada.getTime() < dataSaida.getTime() ? true : false;

    if (!dataValida) throw Error("Data de Reserva inválida!");

    quartoDesejado.disponivel = false;
    const reserva: Reserva = {
      id: Date.now().toString(),
      quarto: quartoDesejado,
      nomeHospede: nomeHospede,
      checkIn: dataEntrada,
      checkOut: dataSaida,
    };
    this.reservas.push(reserva);
    console.log("-------------RESERVAS FEITAS--------------");
    console.table(this.reservas);
    return reserva;
  }

  calcularTotalDiarias(
    checkIn: Date,
    checkOut: Date,
    valorQuarto: number,
  ): number {
    const diferencaEmMs = checkOut.getTime() - checkIn.getTime();

    const msPorDia = 24 * 60 * 60 * 1000;

    const quantidadeDias = Math.round(diferencaEmMs / msPorDia);

    const diariasEfetivas = quantidadeDias <= 0 ? 1 : quantidadeDias;

    return diariasEfetivas * valorQuarto;
  }

  cancelarReserva(idReserva: string): void {
    const reserva = this.reservas.find((reserva) => reserva.id === idReserva);

    if (!reserva) throw Error("Reserva Não encontrada!");

    reserva.quarto.disponivel = true;
    this.reservas = this.reservas.filter((reserva) => reserva.id !== idReserva);
    console.log("Reserva de Id: ", idReserva, "cancelada com sucesso!");
  }
}

const Hotel1 = new Hotel();
console.log("Hotel1: ", Hotel1);

const quarto1: Quarto = {
  numero: 1,
  categoria: CategoriaQuarto.LUXO,
  precoPorNoite: 150,
  disponivel: true,
};

const quarto2: Quarto = {
  numero: 2,
  categoria: CategoriaQuarto.STANDARD,
  precoPorNoite: 100,
  disponivel: true,
};

const quarto3: Quarto = {
  numero: 3,
  categoria: CategoriaQuarto.SUITE,
  precoPorNoite: 100,
  disponivel: true,
};

Hotel1.cadastrarQuarto(quarto1);
Hotel1.cadastrarQuarto(quarto2);
Hotel1.cadastrarQuarto(quarto3);

const reserva1 = {
  nomeHospede: "Pedro Ernesto",
  checkIn: "2026-09-05",
  checkOut: "2026-09-06",
  numQuarto: 1,
};

const reciboReserva = Hotel1.fazerReserva(
  reserva1.nomeHospede,
  reserva1.checkIn,
  reserva1.checkOut,
  reserva1.numQuarto,
);

const totalReserva = Hotel1.calcularTotalDiarias(
  reciboReserva.checkIn,
  reciboReserva.checkOut,
  reciboReserva.quarto.precoPorNoite,
);
console.log(`Total da Reserva: ${totalReserva} R$`);
console.log(Hotel1);

Hotel1.cancelarReserva(reciboReserva.id);

console.log(Hotel1);
