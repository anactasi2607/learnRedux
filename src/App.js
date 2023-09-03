
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchCustomers } from './asyncActions/customers';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);

  const addCash = (cash) => {
    dispatch({type: "ADD_CASH", payload: cash});
  }

  const getCash = (cash) => {
    dispatch({type: "GET_CASH", payload: cash});
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

        <button onClick={() => getCash(Number(prompt()))}>Снять со счета</button>

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
