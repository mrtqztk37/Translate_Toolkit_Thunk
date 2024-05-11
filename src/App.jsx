import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions";
import Select from "react-select";
import { setAnswer } from "./redux/slices/translateSlice";

const App = () => {
  const langState = useSelector((store) => store.languageSlice);
  const translateState = useSelector((store) => store.translateSlice);
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const [text, setText] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages]
  );

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, text, targetLang }));
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    setText(translateState.answer);
    dispatch(setAnswer(text));
  };

  return (
    <div className="bg-zinc-900  h-full md:h-screen   text-white grid place-items-center ">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold mb-7">Çeviri +</h1>

        <div className="flex gap-2 text-black ">
          <Select
            onChange={(lang) => setSourceLang(lang)}
            isDisabled={langState.isLoading}
            isLoading={langState.isLoading}
            options={formatted}
            value={sourceLang}
            className="flex-1"
          />
          <button
            onClick={handleSwap}
            className="text-white rounded py-2 px-6 bg-zinc-700 transition hover:ring-2 hover:bg-zinc-800"
          >
            Değiş
          </button>
          <Select
            value={targetLang}
            onChange={(lang) => setTargetLang(lang)}
            isDisabled={langState.isLoading}
            isLoading={langState.isLoading}
            options={formatted}
            className="flex-1"
          />
        </div>

        <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col ">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black"
          ></textarea>
          <div className="w-full relative ">
            {translateState.isLoading && (
              <div class="loader absolute top-[50%] left-[50%] translate-x-[-50%]">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                <div class="bar4"></div>
                <div class="bar5"></div>
                <div class="bar6"></div>
                <div class="bar7"></div>
                <div class="bar8"></div>
                <div class="bar9"></div>
                <div class="bar10"></div>
                <div class="bar11"></div>
                <div class="bar12"></div>
              </div>
            )}
            <textarea
              disabled
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded  text-gray-300"
              value={translateState.answer}
            ></textarea>
          </div>
        </div>

        <button
          onClick={handleTranslate}
          className="rounded-md cursor-pointer py-3 px-5 text-[17px] font-semibold bg-zinc-700 mt-3 hover:ring-2 hover:bg-zinc-900 transition "
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
