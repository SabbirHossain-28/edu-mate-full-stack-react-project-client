import PropTypes from "prop-types";

const SectionHeader = ({title,description}) => {
    return (
        <div className="text-center space-y-4">
            <h2 className="text-4xl text-gray-700 dark:text-gray-300 font-raleWay font-semibold">{title}</h2>
            <p className="text-base text-gray-700 dark:text-gray-400 font-poppin">{description}</p>
        </div>
    );
};

SectionHeader.propTypes={
    title:PropTypes.string,
    description:PropTypes.string
}
export default SectionHeader;