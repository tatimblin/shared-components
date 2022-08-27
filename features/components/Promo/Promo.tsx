import React from "react";
import { Image as ImageType, CTA } from "@yext/types";
import { Image } from "@yext/pages/components";

/**
 * Subset of data coming from platform
 */
export interface PromoType {
  title: string
  body: string
  image?: ImageType
  cta?: CTA
}

export interface PromoProps extends PromoType {
  imageLeft?: boolean
}

export const Promo: React.FC<PromoProps> = ({
  imageLeft,
  ...content
}) => {
  return (
    <section className="container mx-auto grid sm:grid-cols-12">
      {content.image && <Image image={content.image} />}
      <div className="span-cols-7">
        <h2>{content.title}</h2>
        <p>{content.body}</p>
      </div>
    </section>
  );
}
