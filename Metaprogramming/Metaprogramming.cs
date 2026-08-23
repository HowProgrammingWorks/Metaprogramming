using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Metaprogramming
{
    class Metaprogramming
    {
        private static Dictionary<String, Object> conditions = new Dictionary<String, Object>()
        {
            ["length"] = new int[] {10, 200},
            ["contains"] = "Mich",
            ["starts"] = "V",
            ["ends"] = "ov",
            ["not"] = new Dictionary<String, Object>()
            {
                ["length"] = new int[] {50,65},
                ["contains"] = "Abu",
                ["starts"] = "Lev",
                ["ends"] = "iov"
            }

        };


        private static Dictionary<String, Func<string, Object, Boolean>> operations = new Dictionary<string, Func<string, object, bool>>()
        {
            ["length"] = (s, v) => s.Length >= ((int[])v)[0] && s.Length <= ((int[])v)[1],
            ["contains"] = (s, v) => s.Contains((String)v),
            ["starts"] = (s, v) => s.IndexOf((String)v) == 0,
            ["ends"] = (s, v) => s.EndsWith((String)v),
            ["not"] = (s,v) => !(check(s,(Dictionary<String, Object>) v))
        };

        private static Boolean check(String s, Dictionary<String, Object> conditions)
        {
            Boolean valid;

            foreach(var condition in conditions)
            {
                valid = operations[condition.Key].Invoke(s, condition.Value);
                if (!valid) return false;
            }

            return true;
        }

        public List<String> filter(List<String> names)
        {
            List<String> result = new List<string>();
            foreach(String name in names)
            {
                if(check(name, conditions))
                {
                    result.Add(name);
                }
            }
            return result;
        }
    }
}
