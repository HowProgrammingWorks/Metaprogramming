import java.util.*;
import java.util.function.BiFunction;

class Metaprogramming {
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

    private final HashMap<String, Object> conditions = new HashMap<String, Object>() {
        {
            put("length", new int[]{10, 200});
            put("contains", "Mich");
            put("starts", "V");
            put("ends", "ov");
            put("not", new HashMap<String, Object>() {
                {
                    put("length", new int[]{50, 65});
                    put("contains", "Abu");
                    put("starts", "Lev");
                    put("ends", "iov");
                }
            });
        }
    };

    private final HashMap<String, BiFunction<String, Object, Boolean>> operations = new HashMap<String, BiFunction<String, Object, Boolean>>(){
        {
            put("length",   (s, v) -> s.length() >= ((int[])v)[0] && s.length() <= ((int[])v)[1]);
            put("contains", (s, v) -> s.contains((String) v));
            put("starts",   (s, v) -> s.indexOf((String) v) == 0);
            put("ends",     (s, v) -> s.endsWith((String)v));
            put("not",      (s, v) -> !(check(s,(HashMap<String, Object>)v)));
        }
    };

    private Boolean check (String s, HashMap<String, Object> conditions) {
        boolean valid;

        for(Map.Entry entry : conditions.entrySet()){
            valid = operations.get(entry.getKey()).apply(s, conditions.get(entry.getKey()));
            if(!valid) return false;
        }

        return true;
    }

    private List<String> filter(List<String> names){
        List<String> result = new ArrayList<>();
        for (String name:names){
            if(check(name, conditions)){
                result.add(name);
            }
        }
        return result;
    }

    public static void main(String[] args) {

        System.out.println(new Metaprogramming().filter(Arrays.asList(names)));
    }
}