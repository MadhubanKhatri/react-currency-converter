import { useState, useEffect } from 'react';

function Converter() {
    const [currencies, setCurrencies] = useState([]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [isLoading, setIsLoading] = useState(true);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
        const data = await response.json();
        
        const currenciesArray = Object.entries(data).map(([code, name]) => ({
          code: code.toUpperCase(),
          name: name
        }));
        
        setCurrencies(currenciesArray);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    if (!fromAmount || fromAmount <= 0) return;
    
    setIsConverting(true);
    try {
      const fromCurrencyLower = fromCurrency.toLowerCase();
      const toCurrencyLower = toCurrency.toLowerCase();
      
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyLower}.json`);
      const data = await response.json();
      
      if (data[fromCurrencyLower] && data[fromCurrencyLower][toCurrencyLower]) {
        const rate = data[fromCurrencyLower][toCurrencyLower];
        const convertedAmount = (parseFloat(fromAmount) * rate).toFixed(2);
        setToAmount(convertedAmount);
      } else {
        console.error('Conversion rate not found');
        setToAmount('Error');
      }
    } catch (error) {
      console.error('Error converting currency:', error);
      setToAmount('Error');
    } finally {
      setIsConverting(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount('');
  };

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading currencies...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Currency Converter</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="from-amount" className="block text-sm font-medium text-gray-700">
            From:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              id="from-amount"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="Amount"
              min="0"
              step="0.01"
              className="col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Swap currencies"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor="to-amount" className="block text-sm font-medium text-gray-700">
            To:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              id="to-amount"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              placeholder="Converted amount"
              readOnly
              className="col-span-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button 
          onClick={handleConvert}
          disabled={!fromAmount || fromAmount <= 0 || isConverting}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isConverting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Converting...
            </div>
          ) : (
            'Convert'
          )}
        </button>
      </div>
    </div>
  );
}

export default Converter;








