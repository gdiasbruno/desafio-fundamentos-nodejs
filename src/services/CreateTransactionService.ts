import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  total: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type, total }: Request): Transaction {
    if (type === 'outcome' && value > total) {
      throw Error('Not enough money');
    }
    if (type === 'income' || type === 'outcome') {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });

      return transaction;
    }
    throw Error('Invalid Type');
  }
}

export default CreateTransactionService;
