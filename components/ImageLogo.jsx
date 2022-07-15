import { Flex, Image } from "@chakra-ui/react";

const ImageLogo = ({ tag, baseSize = "30px", mdSize = "50px", style = {} }) => {
	const imageSize = { minW: { base: baseSize, md: mdSize }, maxW: { base: baseSize, md: mdSize } };
	return (
		tag && (
			<Flex alignItems="center" justifyContent="center" {...imageSize} {...style}>
				<Image objectFit="cover" src={`/images/Logos/${tag}.png`} alt={tag}></Image>
			</Flex>
		)
	);
};

export default ImageLogo;
