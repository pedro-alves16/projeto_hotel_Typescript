enum CategoriaQuarto {
  "STANDARD",
  "LUXO",
  "SUITE",
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
}

const Hotel1 = new Hotel();
Hotel1.cadastrarQuarto({
  numero: 16,
  categoria: CategoriaQuarto["SUITE"],
  precoPorNoite: 300,
  disponivel: true,
});

console.log(Hotel1);
