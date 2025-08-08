import logo from "@/assets/img/eapiis.png";
import text from "@/assets/img/text.png";
function Logo() {
    return (
        <div className="flex items-center gap-x-2">
            <img src={logo} alt="Logo Universidad" className="w-10" />
            <div className="h-16 flex items-center gap-x-0.5">
                <hr className="h-full w-0.5 bg-accent" />
            </div>
            <img src={text} alt="Logo Universidad" className="w-36" />
        </div>
    );
}

export default Logo;
