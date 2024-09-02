import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function FooterComponent() {
  return (
    <Footer container className="gradientUni2">
      <nav className="w-full text-center">
        <section className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold text-white my-5">
              Workflow <span className="text-[#324de7]">Helper</span>
            </h1>
          </Link>
          <Footer.LinkGroup className="ml-10 text-neutral-100">
            <Footer.Link href="/">About</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
            <section className="flex gap-1">
              <FaLinkedinIn className="text-xl" />
              <FaGithub className="text-xl" />
              <FaXTwitter className="text-xl" />
            </section>
          </Footer.LinkGroup>
        </section>
        <Footer.Divider className="" />
        <Footer.Copyright
          className="text-white"
          href="#"
          by="TR-DEV"
          year={2024}
        />
      </nav>
    </Footer>
  );
}

export default FooterComponent;
