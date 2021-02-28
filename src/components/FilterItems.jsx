import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { cartAmount, totalPrice } from '../actions';
function FilterItems(props) {
  const dispatch = useDispatch();
  //Smyg kickar igång senaste TotalPrice från localStorage
  const sneakyLoad = () => {
    if (localStorage.getItem('totalPrice') === 0) {
      return;
    }
    else {
      dispatch(totalPrice(localStorage.getItem('totalPrice')))
    }
  }

  let totalOf = [];
  let totalOfAllOrderInPrice = 0;
  const [menu, updateMenu] = useState([{}])

  useEffect(() => {
    axios.get('http://localhost:5000/api/beans').then(res => {
      updateMenu(res.data.menu)
    }).catch(err => console.error(err));

    sneakyLoad()
  }, [menu])

  // Min super "advancerad" filter system (jag kunde nog minska denna om jag visste ett bättre sätt)
  const FilterLoop = () => {
    let name;
    let price;
    let id;
    let amount;
    let order = JSON.parse(localStorage.getItem('order'));
    if (order === null) {
      return null;
    }
    let filterOfBrewCoffee = order.filter(filter => filter.id === '1');
    if (filterOfBrewCoffee.length !== 0) {
      for (let i = 0; i < filterOfBrewCoffee.length; i++) {
        price = filterOfBrewCoffee[i].price * filterOfBrewCoffee.length;
        name = filterOfBrewCoffee[i].title;
        id = filterOfBrewCoffee[i].id;
        amount = filterOfBrewCoffee.length;
      }
      totalOf.push({ id: id, title: name, price: price, amount: amount })
    }

    let filterOfCaffeDoppio = order.filter(filter => filter.id === '2');
    if (filterOfCaffeDoppio.length !== 0) {
      for (let i = 0; i < filterOfCaffeDoppio.length; i++) {
        price = filterOfCaffeDoppio[i].price * filterOfCaffeDoppio.length;
        name = filterOfCaffeDoppio[i].title;
        id = filterOfCaffeDoppio[i].id;
        amount = filterOfCaffeDoppio.length;
      }
      totalOf.push({ id: id, title: name, price: price, amount: amount })
    }
    let filterOfCappuccino = order.filter(filter => filter.id === "3");
    if (filterOfCappuccino.length !== 0) {
      for (let i = 0; i < filterOfCappuccino.length; i++) {
        price = filterOfCappuccino[i].price * filterOfCappuccino.length;
        name = filterOfCappuccino[i].title;
        id = filterOfCappuccino[i].id;
        amount = filterOfCappuccino.length;
      }
      totalOf.push({ id: id, title: name, price: price, amount: amount })
    }
    let filterOfLatteMacchiato = order.filter(filter => filter.id === "4");
    if (filterOfLatteMacchiato.length !== 0) {
      for (let i = 0; i < filterOfLatteMacchiato.length; i++) {
        price = filterOfLatteMacchiato[i].price * filterOfLatteMacchiato.length;
        name = filterOfLatteMacchiato[i].title;
        id = filterOfLatteMacchiato[i].id;
        amount = filterOfLatteMacchiato.length;
      }
      totalOf.push({ id: id, title: name, price: price, amount: amount })
    }

    let filterOfCoffeeLatte = order.filter(filter => filter.id === "5");
    if (filterOfCoffeeLatte.length !== 0) {
      for (let i = 0; i < filterOfCoffeeLatte.length; i++) {
        price = filterOfCoffeeLatte[i].price * filterOfCoffeeLatte.length;
        name = filterOfCoffeeLatte[i].title;
        id = filterOfCoffeeLatte[i].id;
        amount = filterOfCoffeeLatte.length;
      }
      totalOf.push({ id: id, title: name, price: price, amount: amount })
    }

    let filterOfCortado = order.filter(filter => filter.id === "6");
    if (filterOfCortado.length !== 0) {
      for (let i = 0; i < filterOfCortado.length; i++) {
        price = filterOfCortado[i].price * filterOfCortado.length;
        name = filterOfCortado[i].title;
        id = filterOfCortado[i].id;
        amount = filterOfCortado.length;
      }
      totalOf.push({ id: id, title: name, price: price, amount: amount })
    }

    for (let i = 0; i < totalOf.length; i++) {
      totalOfAllOrderInPrice += totalOf[i].price;
    }
    localStorage.setItem('totalPrice', totalOfAllOrderInPrice)

    return totalOf.map((item, key) => <li key={key} className="order-list-item">
      <div className="item-container">
        <div className="order-item-container">
          <h2 className="item-title">{item.title}</h2>
          <span className="underline" />
          <div className="arrow-amount-container">
            <button type="button" className="arrow up" data-id={item.id} onClick={addOrder}></button>
            <h4>{item.amount}</h4>
            <button type="button" className="arrow down" data-id={item.id} onClick={removeOrder}></button>
          </div>
        </div>
        <div className="total-price-from-title">
          <div className="total-price-container">
            <h5 className="total-price">{item.price} kr</h5>
            <span className="underline" />
          </div>
        </div>

      </div>
    </li>)

  }
  const addOrder = (e) => {
    let add = e.target.dataset.id;
    let newOrder = menu.filter(item => item.id === Number(add));
    let oldOrder = JSON.parse(localStorage.getItem('order'));
    if (oldOrder.length > 0) {
      let order = [...oldOrder, { id: String(newOrder[0].id), title: newOrder[0].title, price: String(newOrder[0].price) }]
      localStorage.setItem('order', JSON.stringify(order));

      dispatch(cartAmount(order.length));
      dispatch(totalPrice(localStorage.getItem('totalPrice')))
    }
  }

  const removeOrder = (e) => {
    let remove = e.target.dataset.id;
    let oldOrder = JSON.parse(localStorage.getItem('order'));
    for (let i = 0; i < oldOrder.length; i++) {
      if (oldOrder[i].id === remove) {
        oldOrder.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('order', JSON.stringify(oldOrder));

    dispatch(cartAmount(oldOrder.length));
    dispatch(totalPrice(localStorage.getItem('totalPrice')))

  }
  return (
    FilterLoop()
  );
}

export default FilterItems;