import java.util.ArrayList;
import java.util.List;

class FilterSimple {
    private static final String[] names = {
            "Marcus Aurelius Antoninus Augustus",
            "Darth Vader",
            "Victor Michailovich Glushkov",
            "Gottfried Wilhelm von Leibniz",
            "Mao Zedong",
            "Vladimir Sergeevich Soloviov",
            "Ibn Arabi",
            "Lev Nikolayevich Tolstoy",
            "Muammar Muhammad Abu Minyar al-Gaddafi",
            "Rene Descartes",
            "Fyodor Mikhailovich Dostoyevsky",
            "Benedito de Espinosa"
    };

    public static void main(String[] args) {

        System.out.println(new FilterSimple().filter(names));
    }

    private List<String> filter(String[] names) {
        List<String> result = new ArrayList<>();
        String name;
        for (String name1 : names) {
            name = name1;
            if (
                    name.length() >= 10 && name.length() <= 200 &&
                            name.contains("Mich") &&
                            name.indexOf("V") == 0 &&
                            name.endsWith("ov") &&
                            !(
                                    name.length() >= 50 &&
                                            name.length() <= 65 &&
                                            name.contains("Abu") &&
                                            name.indexOf("Lev") == 0 &&
                                            name.endsWith("iov")
                            )
                    ) result.add(name);
        }
        return result;
    }
}