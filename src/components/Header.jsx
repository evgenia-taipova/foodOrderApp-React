import imgLogo from "../assets/logo.jpg";
export default function Header() {
  return (
    <main id="main-header">
      <div id="title">
        <img src={imgLogo} />
        <h1>ReactFood</h1>
      </div>
      <button>Cart(?)</button>
    </main>
  );
}
