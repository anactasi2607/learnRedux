
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchCustomers } from './asyncActions/customers';
import { addCashAction, asyncAddCashAction, asyncGetCashAction, getCashAction } from './store/cashReducer';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);

  const addCash = (cash) => {
    dispatch(addCashAction(cash));
  }

  const asyncAddCash = (cash) => {
    dispatch(asyncAddCashAction(cash));
  }

  const getCash = (cash) => {
    dispatch(getCashAction(cash));
  }

  const asyncGetCash = (cash) => {
    dispatch(asyncGetCashAction(cash));
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };

    dispatch(addCustomerAction(customer));
  }

  const removeCustomer = (id) => {
    dispatch(removeCustomerAction(id));
  }

  return (
    <div className="App">
      <div>Баланс: {cash}</div>

      <div style={{display: "flex"}}>
        <button onClick={() => addCash(Number(prompt()))}>Пополнить счет</button>

        <button onClick={() => asyncAddCash(Number(prompt()))}>Пополнить счет асинхронно</button>

        <button onClick={() => getCash(Number(prompt()))}>Снять со счета</button>

        <button onClick={() => asyncGetCash(Number(prompt()))}>Снять со счета асинхронно</button>

        <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>

        <button onClick={() => dispatch(fetchCustomers())}>Добавить клиентов из базы</button>
      </div>

      {customers.length > 0 ?
        <div>
          {customers.map(customer =>
            <div key={customer.id} onClick={() => removeCustomer(customer.id)}>{customer.name}</div>
          )}
        </div>
        :
        <div>Клиенты отсутствуют</div>
      }
    </div>
  );
}

export default App;
