import java.util.Currency;
import java.util.Locale;

public class ShowCurrencies {
    static final String[] countryCodes = Locale.getISOCountries();
    public static void main(String[] args) {
        for (String country : countryCodes) {
            try {
                Locale locale = new Locale("", country);
                String currencyCode = Currency.getInstance(locale).getCurrencyCode();
                System.out.println(country + ": '" + currencyCode + "',");
            } catch(Exception e) {
            }
        }
    }
}