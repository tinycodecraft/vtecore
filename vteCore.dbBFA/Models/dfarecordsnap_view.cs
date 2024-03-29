﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace vteCore.dbBFA.Models;

[Keyless]
public partial class dfarecordsnap_view
{
    public int Id { get; set; }

    [StringLength(50)]
    public string InRegion { get; set; }

    public int ImportKey { get; set; }

    [StringLength(81)]
    public string StctNo { get; set; }

    [StringLength(44)]
    public string FormattedStctNo { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? TakeDate { get; set; }

    [StringLength(50)]
    public string InitType { get; set; }

    [StringLength(50)]
    public string HSISType { get; set; }

    [StringLength(50)]
    public string ChildType { get; set; }

    [StringLength(50)]
    public string ParentType { get; set; }

    [StringLength(50)]
    public string StctAdjoin { get; set; }

    [StringLength(500)]
    public string Location { get; set; }

    [StringLength(50)]
    public string StairIndp { get; set; }

    [StringLength(50)]
    public string District { get; set; }

    public int ExitCnt { get; set; }

    [StringLength(50)]
    public string FacilityProvision { get; set; }

    [StringLength(50)]
    public string Status { get; set; }

    public bool IsAudited { get; set; }

    [Required]
    [StringLength(3)]
    [Unicode(false)]
    public string InAudited { get; set; }

    [StringLength(50)]
    public string UpdatedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdatedAt { get; set; }

    [StringLength(50)]
    public string EndorsedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? EndorsedAt { get; set; }

    [StringLength(50)]
    public string AuditedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? AuditedAt { get; set; }

    [StringLength(50)]
    public string LastUpdatedBy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LastUpdatedAt { get; set; }
}