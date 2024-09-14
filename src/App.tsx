import { useReducer, useEffect, useMemo, useRef } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
import logo from "./img/logo.png";

export default function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  useEffect(() => {
    if (state.activeId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.activeId]);

  const canRestartApp = () =>
    useMemo(() => state.activities.length, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl px-5 mx-auto flex justify-between">
          <div className="mt-1 flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="h-6 w-auto"
              style={{ maxWidth: "230px" }}
            />
          </div>

          <button
            className="bg-gray-800 disabled:opacity-10 hover:bg-gray-900 p-1 font-bold uppercase text-white cursor-pointer rounded-lg text-sm"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5" ref={formRef}>
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}
