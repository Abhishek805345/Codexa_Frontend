import { Link } from "react-router-dom";
import css from "./style/nav.module.css";
import { GoCodescan,GoCheck } from "react-icons/go";
import { useSelector} from "react-redux";
import { Login } from "./login";
import Store,{ stateActions, UserActions } from "../Utility/store";
import { Register } from "./Register";
import { Hero } from "./hero";
import { sessionCheck } from "../Services/authentication";
import { Loading } from "./loading";

export function Navbar(){
  const {shower}=useSelector(store=>store.stateReducer);
  const {status}=useSelector(store=>store.loadingReducer);
  console.log("status is sthis",status);
  console.log(shower);
  return (
    <>
  <div className={css.outermostlayer}>
    <div className={css.iconlayer}>
      <div className={css.logo}>
  <span>&lt;/&gt;</span>
  <strong>Codexa</strong>
</div>
    </div>

    <div className={css.linklayer}>
      <ul className={css.linklist}>
        <li>
          <button className={css.links}>
            About
          </button>
        </li>

        <li>
          <button className={css.links}>
            Demo
          </button>
        </li>

        <li>
          <button
            className={css.links}
            onClick={() => {
              Store.dispatch(
                stateActions.changer({
                  newState: "Login",
                })
              );
            }}
          >
            Login
          </button>
        </li>

        <li>
          <button
            className={css.links}
            onClick={() => {
              Store.dispatch(
                stateActions.changer({
                  newState: "Register",
                })
              );
            }}
          >
            Register
          </button>
        </li>
      </ul>
    </div>
  </div>

  {status === true ? <Loading /> : null}

  {shower === "Login" ? <Login /> : null}

  {shower === "Register" ? <Register /> : null}

  {shower === "Hero" ? (
    <>
      {/* HERO */}
      <Hero />

      {/* INTRODUCTION */}
      <section className={css.introSection}>
        <div className={css.sectionLabel}>
          THE CODExA WORKSPACE
        </div>

        <h2>
          Everything you need to
          <span> build together.</span>
        </h2>

        <p>
          Codexa brings real-time coding, collaboration,
          communication and project management into one
          focused workspace.
        </p>
      </section>

      {/* FEATURES */}
      <section className={css.featuresSection}>
        <div className={css.sectionHeader}>
          <span>01 — FEATURES</span>

          <h2>
            Built for developers
            <br />
            who work together.
          </h2>
        </div>

        <div className={css.featureGrid}>

          <article className={css.featureCard}>
            <div className={css.featureNumber}>
              01
            </div>

            <div className={css.featureIcon}>
              {"</>"}
            </div>

            <h3>Real-time Coding</h3>

            <p>
              Write and edit code together with your
              teammates in the same workspace.
            </p>
          </article>


          <article className={css.featureCard}>
            <div className={css.featureNumber}>
              02
            </div>

            <div className={css.featureIcon}>
              {"◉"}
            </div>

            <h3>Live Collaboration</h3>

            <p>
              See your teammates online and collaborate
              without constantly switching between tools.
            </p>
          </article>


          <article className={css.featureCard}>
            <div className={css.featureNumber}>
              03
            </div>

            <div className={css.featureIcon}>
              {"⌘"}
            </div>

            <h3>Shared Rooms</h3>

            <p>
              Create dedicated coding rooms for projects,
              teams, experiments and discussions.
            </p>
          </article>


          <article className={css.featureCard}>
            <div className={css.featureNumber}>
              04
            </div>

            <div className={css.featureIcon}>
              {"↗"}
            </div>

            <h3>Run & Test</h3>

            <p>
              Write code, execute it and instantly inspect
              the output without leaving your workspace.
            </p>
          </article>


          <article className={css.featureCard}>
            <div className={css.featureNumber}>
              05
            </div>

            <div className={css.featureIcon}>
              {"●"}
            </div>

            <h3>Live Chat</h3>

            <p>
              Discuss ideas, debug problems and communicate
              with everyone inside the room.
            </p>
          </article>


          <article className={css.featureCard}>
            <div className={css.featureNumber}>
              06
            </div>

            <div className={css.featureIcon}>
              {"✦"}
            </div>

            <h3>AI Ready</h3>

            <p>
              A workspace designed to evolve with
              AI-powered development and assistance.
            </p>
          </article>

        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className={css.workflowSection}>

        <div className={css.workflowIntro}>
          <span>02 — WORKFLOW</span>

          <h2>
            From idea to
            <br />
            <span>working code.</span>
          </h2>

          <p>
            Create a room, invite your teammates and start
            building. Codexa keeps the entire workflow
            connected.
          </p>
        </div>


        <div className={css.workflowSteps}>

          <div className={css.workflowStep}>
            <span>01</span>

            <div>
              <h3>Create a Room</h3>

              <p>
                Start a dedicated workspace for your
                project.
              </p>
            </div>
          </div>


          <div className={css.workflowStep}>
            <span>02</span>

            <div>
              <h3>Invite Your Team</h3>

              <p>
                Bring your teammates into the same
                collaborative environment.
              </p>
            </div>
          </div>


          <div className={css.workflowStep}>
            <span>03</span>

            <div>
              <h3>Write Together</h3>

              <p>
                Edit code, communicate and work together
                in real time.
              </p>
            </div>
          </div>


          <div className={css.workflowStep}>
            <span>04</span>

            <div>
              <h3>Build & Ship</h3>

              <p>
                Run your code, solve problems and turn
                ideas into working software.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* COLLABORATION SHOWCASE */}
      <section className={css.showcaseSection}>

        <div className={css.showcaseBox}>

          <div className={css.showcaseContent}>

            <span>03 — COLLABORATION</span>

            <h2>
              One room.
              <br />
              Everyone connected.
            </h2>

            <p>
              Codexa is designed around the idea that
              developers should spend less time managing
              tools and more time building software.
            </p>

            <div className={css.showcasePoints}>

              <div>
                <strong>01</strong>
                <span>Shared code</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Live presence</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Instant communication</span>
              </div>

            </div>

          </div>


          <div className={css.codeVisual}>

            <div className={css.codeTop}>
              <span></span>
              <span></span>
              <span></span>

              <small>
                codexa.workspace
              </small>
            </div>

            <div className={css.codeBody}>
              <p>
                <i>01</i>
                <span>const</span> team = [
              </p>

              <p>
                <i>02</i>
                &nbsp;&nbsp;developer,
              </p>

              <p>
                <i>03</i>
                &nbsp;&nbsp;designer,
              </p>

              <p>
                <i>04</i>
                &nbsp;&nbsp;engineer
              </p>

              <p>
                <i>05</i>
                ];
              </p>

              <p className={css.codeComment}>
                <i>06</i>
                // build together
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className={css.ctaSection}>

        <div className={css.ctaContent}>

          <span>
            READY TO BUILD?
          </span>

          <h2>
            Your next project
            <br />
            starts here.
          </h2>

          <p>
            Create your first Codexa room and start
            collaborating with your team.
          </p>

          <button
            className={css.ctaButton}
            onClick={() => {
              Store.dispatch(
                stateActions.changer({
                  newState: "Register",
                })
              );
            }}
          >
            Get Started
            <span>→</span>
          </button>

        </div>

      </section>


      {/* FOOTER */}
      <footer className={css.footer}>

        <div className={css.footerTop}>

          <div className={css.footerBrand}>
            <h3>Codexa</h3>

            <p>
              Code. Collaborate. Create.
            </p>
          </div>


          <div className={css.footerLinks}>

            <div>
              <span>PRODUCT</span>

              <button>Features</button>
              <button>Demo</button>
              <button>Rooms</button>
            </div>


            <div>
              <span>COMPANY</span>

              <button>About</button>
              <button>Contact</button>
              <button>GitHub</button>
            </div>


            <div>
              <span>ACCOUNT</span>

              <button
                onClick={() => {
                  Store.dispatch(
                    stateActions.changer({
                      newState: "Login",
                    })
                  );
                }}
              >
                Login
              </button>

              <button
                onClick={() => {
                  Store.dispatch(
                    stateActions.changer({
                      newState: "Register",
                    })
                  );
                }}
              >
                Register
              </button>
            </div>

          </div>

        </div>


        <div className={css.footerBottom}>

          <span>
            © 2026 Codexa
          </span>

          <span>
            Built for developers.
          </span>

        </div>

      </footer>
    </>
  ) : null}
</>
  )
} 


export const userLoginSessionCheck=async ()=>{
  const result=await sessionCheck();
  console.log("result of session check is this",result);
  if (result.login===true){
    Store.dispatch(UserActions._idChanger({
      new_id:result.userdata._id,
    }))
    Store.dispatch(UserActions.fullnameChanger({
      newfullname:result.userdata.username,
    }))
    Store.dispatch(UserActions.usernameChanger({
      newusername:result.userdata.rusername,
    }))
    Store.dispatch(UserActions.emailchanger({
      newemail:result.userdata.email,
    }))
    return Response.redirect('/home');
  }else{
    return 0;
  }
}